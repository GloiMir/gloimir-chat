import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import {route} from './routes/ChatRoute.js'
import http from 'http'
import {Server} from 'socket.io'
const app = express()
const serveur = http.createServer(app)
  
dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>console.log('Connexion à MongoDB a reussi'))
.catch(()=>console.log('Connexion à MongoDB a échoué'))

const io =new Server(serveur, {
    cors: {
        origin: 'https://gloimir-chat-umber.vercel.app/',
        methods: ["GET", "POST"]
    }
})
export const listSockets = []
io.on('connection',(socket)=>{
    listSockets.push(socket)
})

app.use(cors())
app.use(route)

serveur.listen(4000,()=>console.log('Notre serveur est en marche...'))