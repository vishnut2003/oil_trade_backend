const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const clientsSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    clientCode: {
        type: String,
        required: true
    },
}, {timestamps: true})

const ClientsModel = mongoose.model('Clients', clientsSchema);
module.exports = ClientsModel;