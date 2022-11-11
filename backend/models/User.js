import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    username:String,
    password:String,
    image:String
})

// module.exports = mongoose.model('user',schemaUser)
const User = mongoose.model('user',schemaUser)
export {User}