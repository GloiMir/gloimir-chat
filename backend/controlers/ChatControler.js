const User =  require('../models/User') //Notre modele de données user
const Message = require('../models/Message') //Notre modele de données message

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
        .then(()=>console.log("Un nouveau message vient d'etre inseré"))
        .catch((error)=>console.log(error))
    })
}

const createUser =  (req,res)=>{
    req.on('data', (chunk)=> {
        const user = new User({...JSON.parse(chunk.toString())})
        user.save()
        .then(()=>console.log("Un nouveau utilisateur vient d'etre inseré"))
        .catch((error)=>console.log(error))
    })
}

module.exports = {sendUsers,sendMessages,createMessage,createUser}