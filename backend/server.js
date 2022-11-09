const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>console.log('Connexion à MongoDB a reussi'))
.catch(()=>console.log('Connexion à MongoDB a échoué'))

app.use(express.urlencoded({extended: false}))

app.use((_,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATH,OPTIONS');
    next();
})

app.use(require('./routes/ChatRoute'))

app.listen(4000,()=>console.log('Notre serveur est en marche...'))