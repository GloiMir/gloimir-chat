import { User } from '../models/User.js' //Notre modele de données user
import { Message } from '../models/Message.js' //Notre modele de données message
import { listSockets } from '../server.js'

import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

//controleur signup
const register = async (req, res, next) => {
    req.on('data', async (chunk) => {
        try {
            const { username, password, image } = { ...JSON.parse(chunk.toString()) };
            const usernameCheck = await User.findOne({ username });
            if (usernameCheck) {
                return res.json({ message: "Username already used", status: false });
            }

            const hashedPassword = await hash(password, 10);
            const user = User.create({
                username: username,
                password: hashedPassword,
                image
            });
            listSockets.forEach((socket) => socket.emit('newUser', user))

            delete user.password;
            res.json({
                status: true,
                userId: user._id,
            });
        } catch (err) {
            next(err);
        }
    })
};

//controlleur login
const login = (req, res, next) => {
    req.on('data', async (chunk) => {
        try {
            const { username, password } = { ...JSON.parse(chunk.toString()) };
            const user = await User.findOne({ username });

            if (!user) {
                return res.json({
                    message: "Incorrect username or password1",
                    status: false,
                });
            }
            const isPasswordValide = await compare(password, user.password);
            if (!isPasswordValide) {
                return res.json({
                    message: "Incorrect username or password2",
                    status: false,
                });
            }

            delete user.password;
            return res.json({
                user: user.username,
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                }),
            });
        } catch (err) {
            next(err);
        }
    })
};


//controleur d'envoi des utilisateurs
const sendUsers = (_, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))
}

//controleur d'envoi des messages
const sendMessages = (_, res) => {
    Message.find()
        .then((messages) => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }))
}

//controleur de creation de message
const createMessage = (req, _) => {
    req.on('data', (chunk) => {
        const message = new Message({ ...JSON.parse(chunk.toString()) })
        message.save()
            .then(() => {
                console.log("Un nouveau message vient d'etre inseré")
            })
            .catch((error) => console.log(error))
        listSockets.forEach((socket) => socket.emit('newMessage', message))
    })
}


export { login, register, sendUsers, sendMessages, createMessage }