const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const salesLocationSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}, {timestamps: true});

const SalesLocationModel = mongoose.model('SalesLocation', salesLocationSchema);
module.exports = SalesLocationModel;