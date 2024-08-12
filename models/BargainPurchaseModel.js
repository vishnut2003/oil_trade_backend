const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const purchaseSchema = new Schema({
    bargainDate: {
        type: Date,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    bargainNo: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    productPurchased: {
        type: Array
    }
}, {timestamps: true})

const BargainPurchaseModel = mongoose.model('BargainPurchase', purchaseSchema);
module.exports = BargainPurchaseModel;