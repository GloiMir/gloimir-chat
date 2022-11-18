import mongoose from 'mongoose'

const schemaMessage = new mongoose.Schema({
    date:String,
    from:String,
    to:String,
    content:String
})

const Message = mongoose.model('message',schemaMessage)
export {Message}