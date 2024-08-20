const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const overflowStocksSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    overflowQty: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const OverflowStocksModel = mongoose.model('OverflowStocks', overflowStocksSchema);
module.exports = OverflowStocksModel;