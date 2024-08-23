const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const salesInvoiceSchema = new Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    bargainNo: {
        type: String,
        required: true
    },
    seller: {
        type: Object,
        required: true
    },
    client: {
        type: Object,
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
    discount: {
        type: Number,
        default: 0
    },
    deliveryTerms: {
        type: String,
        required: true
    }
}, {timestamps: true})

const SalesInvoiceModel = mongoose.model('SalesInvoice', salesInvoiceSchema);
module.exports = SalesInvoiceModel;