const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    prevPrice: {
        type: Array
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product