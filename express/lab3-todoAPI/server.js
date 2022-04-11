const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()


const listRoutes = require('./routes/listRoutes')
const itemRoutes = require('./routes/itemRoutes')

const app = express()

//middleware
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

//routes
app.use('/list', listRoutes)
app.use('/item', itemRoutes)


//connect to db
mongoose.connect(process.env.DB_URL + process.env.DB_COLLECTION)
.then(() => {
    console.log('connected to db')
    app.listen(process.env.PORT)
}).catch((err) => {
    console.log(err)
})