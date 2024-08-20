const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bargainSalesSchema = new Schema({
    bargainDate: {
        type: Date,
        required: true
    },
    bargainNo: {
        type: String,
        required: true
    },
    client: {
        type: Object,
        required: true
    },
    deliveryTerms: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    seller: {
        type: Object,
        required: true
    },
    validity: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const BargainSalesModel = mongoose.model('BargainSalesModel', bargainSalesSchema);

module.exports = BargainSalesModel;