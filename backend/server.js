const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

// import express from 'express'
// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import cors from 'cors'
// import chatRoute from './routes/ChatRoute'

dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>console.log('Connexion à MongoDB a reussi'))
.catch(()=>console.log('Connexion à MongoDB a échoué'))

app.use(cors())
app.use(require('./routes/ChatRoute'))

app.listen(4000,()=>console.log('Notre serveur est en marche...'))