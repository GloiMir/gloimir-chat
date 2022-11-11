// const app = require('express')()
// const mongoose = require('mongoose')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const serveur = require('http').createServer(app)

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
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
io.on('connection',(socket)=>{
    console.log('Un client vient de se connecter..')
    socket.emit('message',"Bonjour cher utilisateur")
})

app.use(cors())
app.use(route)

// app.listen(4000,()=>console.log('Notre serveur est en marche...'))
serveur.listen(4000,()=>console.log('Notre serveur est en marche...'))
export {io}