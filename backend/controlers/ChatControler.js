import {User} from  '../models/User.js' //Notre modele de données user
import {Message} from '../models/Message.js' //Notre modele de données message
import { io } from '../server.js'

const sendUsers = (_,res)=>{
    User.find()
        .then((users)=>res.status(200).json(users))
        .catch(error=>res.status(400).json({error}))
}

const sendMessages = (_,res)=>{
    Message.find()
        .then((messages)=>res.status(200).json(messages))
        .catch(error=>res.status(400).json({error}))
}

const createMessage =  (req,res)=>{
    req.on('data', (chunk)=> {
        const message = new Message({...JSON.parse(chunk.toString())})
        message.save()
        .then(()=>{
            console.log("Un nouveau message vient d'etre inseré")
        })
        .catch((error)=>console.log(error))
        io.on('connection',(socket)=>{
            socket.broadcast.emit('newMessage',message)
        })
    })
}

const createUser =  (req,res)=>{
    req.on('data', (chunk)=> {
        const user = new User({...JSON.parse(chunk.toString())})
        user.save()
        .then(()=>console.log("Un nouveau utilisateur vient d'etre inseré"))
        .catch((error)=>console.log(error))
        io.on('connection',(socket)=>{
            socket.broadcast.emit('newUser',user)
        })
    })
}

export {sendUsers,sendMessages,createMessage,createUser}