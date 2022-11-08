const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    username:String,
    password:String,
    image:String
})

module.exports = mongoose.model('user',schemaUser)