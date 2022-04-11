const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    {
        toJson: {
            virtuals: true
        }
    }
);

listSchema.virtual('items', {
    //virtual attribute is called items
    ref: 'Item',
    localField: '_id',
    foreignField: 'list',
    justOne: false
})

const List = mongoose.model('List', listSchema);
module.exports = List;