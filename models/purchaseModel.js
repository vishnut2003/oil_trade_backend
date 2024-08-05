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
    }
}, {timestamps: true})

const PurchaseModel = mongoose.model('Purchase', purchaseSchema);
module.exports = PurchaseModel;