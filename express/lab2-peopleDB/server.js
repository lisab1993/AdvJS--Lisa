const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()
const Person = require('./models/Person')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())


//List
app.get('/', async(req, res) => {
    const people = await Person.find()
    res.send(people)
})

//Create
app.post('/', async(req, res) => {
    const person = new Person(req.body)
    await person.save()
    res.send(person)
})

//Retrieve
app.get('/:id', async(req, res) => {
    const person = await Person.findOne({ _id: req.params.id })
    if (!person) {
        req.sendStatus(404)
    }
    res.send(person)
})

//Update
app.patch('/:id', async(req, res) => {
    const person = await Person.findOne({ _id: req.params.id })
    if (!person) {
        res.sendStatus(404)
    }

    const personData = req.body
    person.set(personData)
    await person.save()
    res.send(person)
})

//Delete
app.delete('/:id', async(req, res) => {
    const person = await Person.findOne({ _id: req.params.id })
    if (!person) {
        res.sendStatus(404)
    }
    await person.remove()
    res.send(person)
})

mongoose.connect(process.env.DB_URL + process.env.DB_COLLECTION)
.then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT)
}).catch((err) => {
    console.log('err')
})