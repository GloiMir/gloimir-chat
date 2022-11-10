const express = require('express')
const {sendUsers,sendMessages,createMessage,createUser} = require('../controlers/ChatControler')

const route = express.Router();

route.get('/users',sendUsers)//Récuperaton des utilisateurs
route.get('/messages',sendMessages)//Recuperation des messages
route.post('/message',createMessage)//Creation d'un nouveau message
route.post('/user',createUser)//Creation d'un nouveau utilisateur

module.exports = route