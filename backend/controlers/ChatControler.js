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

const sendDiscussion = (_,res)=>{
    Message.find({from:" 63682b5ff27b266c3b3c4d2b "|" 63682c4bf27b266c3b3c4d2d ",to:" 63682b5ff27b266c3b3c4d2b "|" 63682c4bf27b266c3b3c4d2d "})
        .then((messages)=>res.status(200).json(messages))
        .catch(error=>res.status(400).json({error}))
}

module.exports = {sendUsers,sendMessages,sendDiscussion}