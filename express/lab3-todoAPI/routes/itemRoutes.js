const { Router } = require('express');
const List = require('../models/List');
const Item = require('../models/Item');

const router = Router()


//List
router.get('/', async(req, res) => {
    const items = await Item.find().populate('list')
    res.send(items)
});

//Create
router.post('/', async (req, res) => {
    const item = new Item(req.body);
    await item.save()
    res.send(item)
});

//Retrieve
router.get('/:id', async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id })
    if (!item) {
        res.sendStatus(404)
    } else {
        res.send(item)
    }
})

//Update
router.patch('/:id', async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id })
    if (!item) {
        res.send(404)
    }

    const itemData = req.body
    item.set(itemData)
    await item.save()
    res.send(item)
})

//Delete
router.delete('/:id', async (req, res) => {
    const item = await Item.findOne({ _id: req.params.id })
    if (!item) {
        res.send(404)
    } else {
        await item.remove()
        res.send(item)
    }
})


module.exports = router