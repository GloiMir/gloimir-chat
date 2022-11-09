const express = require('express')
const {sendUsers,sendMessages,createMessage} = require('../controlers/ChatControler')

const route = express.Router();

route.get('/users',sendUsers)//Récuperaton des utilisateurs
route.get('/messages',sendMessages)//Recuperation des messages
route.post('/message',createMessage)//Creation d'un nouveau message


module.exports = route