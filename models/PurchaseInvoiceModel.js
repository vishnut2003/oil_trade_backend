const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const purchaseInvoiceSchema = new Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    againstBargainNo: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
}, { timestamps: true })

const PurchaseInvoiceModel = mongoose.model('PurchaseInvoice', purchaseInvoiceSchema);
module.exports = PurchaseInvoiceModel;