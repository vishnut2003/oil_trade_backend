const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const purchaseLocationSchema = new Schema({
    location: { type: String },
    address: {type: String}
}, { timestamps: true })

const PurchaseLocation = mongoose.model('PurchaseLocation', purchaseLocationSchema)
module.exports = PurchaseLocation;