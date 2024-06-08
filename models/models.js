
const  mongoose  = require('mongoose')
const Schema = mongoose.Schema


const inserData = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    password:{
        type: String
    },
}, {timestamps: true})

const User = mongoose.model('user', inserData)

module.exports = User