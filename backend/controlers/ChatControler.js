import { User } from '../models/User.js' //Notre modele de données user
import { Message } from '../models/Message.js' //Notre modele de données message
import { listSockets } from '../server.js'

import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res, next) => {
    req.on('data', async (chunk) => {
        try {
            const { username, password } = { ...JSON.parse(chunk.toString()) };
            const usernameCheck = await User.findOne({ username });

            if (usernameCheck) {
                return res.json({ message: "Username already used", status: false });
            }
            // const emailCheck = await User.findOne({ email });

            // if (emailCheck) {
            //     return res.json({ message: "Email already used", status: false });
            // }

            const hashedPassword = await hash(password, 10);
            const user = User.create({
                // email: email,
                username: username,
                password: hashedPassword,
            });
            delete user.password;
            // res.json({ status: true, user });
            res.json({
                status: true,
                userId: user._id,
            });
        } catch (err) {
            next(err);
        }
    })
};

//controllers login
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

// const login = (req, res) => {
//     req.on('data',(chunk)=>{
//         // console.log(JSON.parse(chunk.toString()).password)
//         User.find({ username: JSON.parse(chunk.toString()).username })
//         .then((user) => {
//             // console.log(user)
//             if (!user) {
//                 return res.status(401).json({ message: 'Utilisateur non trouvé' })
//             }
//             if (!compareSync('Gloire1234', user.password)) {
//                 return res.status(401).json({ message: 'Mot de passe invalide' })
//             }
//             const payload = {
//                 username: user.username,
//                 id: user._id
//             }
//             const token = jwt.sign(payload, "random string", { expiresIn: "1d" })
//             return res.status(200).json({
//                 message: 'Connexion reussie',
//                 token: "Baerer " + token
//             })
//         })
//     })

// //     User.find({ username: req.body.username })
// //         .then((user) => {
// //             if (!user) {
// //                 return res.status(401).json({ message: 'Utilisateur non trouvé' })
// //             }
// //             if (!compareSync(req.body.password, user.password)) {
// //                 return res.status(401).json({ message: 'Mot de passe invalide' })
// //             }
// //             const payload = {
// //                 username: user.username,
// //                 id: user._id
// //             }
// //             const token = jwt.sign(payload, "random string", { expiresIn: "1d" })
// //             return res.status(200).json({
// //                 message: 'Connexion reussie',
// //                 token: "Baerer " + token
// //             })
// //         })
// }

// const register = (req,res)=>{
//     req.on('data',(chunk)=>{
//         const user = new User({
//             username:JSON.parse(chunk.toString()).username,
//             password:hashSync(JSON.parse(chunk.toString()).password,10)
//         })
//         user.save()
//         .then(()=>res.status(201).json({message:'Enregistrement reussi'}))
//         .catch(()=>res.status(400).json({message:'Enreistrement echoué'}))
//     })
//     // const user = new User({
//     //     username:req.body.username,
//     //     password:hashSync(req.body.password,10)
//     // }) 
//     // user.save()
//     //     .then(()=>res.status(201).json({message:'Enregistrement reussi'}))
//     //     .catch(()=>res.status(400).json({message:'Enreistrement echoué'}))
// }

const sendUsers = (_, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))
}

const sendMessages = (_, res) => {
    Message.find()
        .then((messages) => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }))
}

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

const createUser = (req, _) => {
    req.on('data', (chunk) => {
        const user = new User({ ...JSON.parse(chunk.toString()) })
        user.save()
            .then(() => console.log("Un nouveau utilisateur vient d'etre inseré"))
            .catch((error) => console.log(error))
        listSockets.forEach((socket) => socket.emit('newUser', user))
    })
}

export { login, register, sendUsers, sendMessages, createMessage, createUser }