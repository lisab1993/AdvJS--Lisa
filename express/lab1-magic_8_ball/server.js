const express = require('express')
const app = express()

const messages = {
    0: 'in due time',
    1: 'maybe someday',
    2: 'fat chance', 
    3: 'you bet!'
}


app.get('/', (req, res) => {
    const choice = Math.floor(Math.random() * Object.keys(messages).length)
    res.json(messages[choice])
    console.log(choice)
})

app.listen(8000, () => {
    console.log('server listening on 8000!')
})
