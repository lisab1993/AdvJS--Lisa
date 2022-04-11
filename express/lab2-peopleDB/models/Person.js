const mongoose = require('mongoose')

const { Schema } = mongoose

// firstName, lastName, username and age.

const personSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'a first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'a last name is required']
    },
    username: {
        type: String,
        required: [true, 'a username is required']
    },
    age: {
        type: Number,
        required: [true, 'age is required']
    },
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person