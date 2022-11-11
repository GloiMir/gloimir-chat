import express from 'express'
import {sendUsers,sendMessages,createMessage,createUser} from '../controlers/ChatControler.js'

const route = express.Router();

route.get('/users',sendUsers)//Récuperaton des utilisateurs
route.get('/messages',sendMessages)//Recuperation des messages
route.post('/message',createMessage)//Creation d'un nouveau message
route.post('/user',createUser)//Creation d'un nouveau utilisateur

export  {route}