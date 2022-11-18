import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    username:String,
    password:String,
    image:String
})

const User = mongoose.model('user',schemaUser)
export {User}