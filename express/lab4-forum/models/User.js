const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    }
})

//before saving a user, has the password
userSchema.pre('save', (next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

module.exports = mongoose.model('Users', userSchema)