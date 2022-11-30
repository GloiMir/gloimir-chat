import express from 'express'
import {login,register,sendUsers,sendMessages,createMessage} from '../controlers/ChatControler.js'
import {Auth} from '../middleware/Auth.js' 

const route = express.Router();

route.post('/login',login)//Connexion de l'utilisateur
route.post('/register',register)//Enregistrement de l'utilisateur
route.get('/users',Auth,sendUsers)//Récuperaton des utilisateurs
route.get('/messages',Auth,sendMessages)//Recuperation des messages
route.post('/message',createMessage)//Creation d'un nouveau message

export  {route}