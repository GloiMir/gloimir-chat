const mongoose = require('mongoose')

const schemaMessage = new mongoose.Schema({
    date:String,
    from:String,
    to:String,
    content:String
})

module.exports = mongoose.model('message',schemaMessage)