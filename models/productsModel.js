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
    },
    qty: {
        type: Number,
        default: 0
    },
    vQty: {
        type: Number,
        default: 0,
    },
    vSoldQty: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

module.exports = Product