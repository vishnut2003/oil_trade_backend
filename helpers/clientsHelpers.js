const BargainSalesModel = require("../models/BargainSalesModel");
const ClientsModel = require("../models/clientsModel");
const SalesInvoiceModel = require("../models/SalesInvoiceModel");

module.exports = {
    createOneClient: (clientData) => {
        return new Promise((resolve, reject) => {
            // Create client code
            const clientCode = `client_no/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`;
            clientData.clientCode = clientCode;
            ClientsModel.findOne({email: clientData.email})
                .then((existCompany) => {
                    if(existCompany) return reject('Email already exist!');
                    const newClient = new ClientsModel(clientData);
                    try {
                        newClient.save()
                    } catch(err) {
                        console.log(err);
                        return
                    }
                    resolve()
                })
        })
    },
    getAllClients: () => {
        return new Promise((resolve, reject) => {
            ClientsModel.find()
                .then((clients) => {
                    resolve(clients);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    deleteOneClient: (clientId) => {
        return new Promise((resolve, reject) => {
            ClientsModel.findByIdAndDelete(clientId)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    updateOneClient: (updatedClient) => {
        return new Promise((resolve, reject) => {
            ClientsModel.findByIdAndUpdate(updatedClient._id, updatedClient)
                .then(() => {
                    resolve('Client updated successfully...')
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    getAllBargainHistory: (clientId) => {
        return new Promise((resolve, reject) => {
            BargainSalesModel.find({'client._id': clientId}, '_id bargainDate bargainNo seller status')
                .then((histories) => {
                    resolve(histories);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    getAllInvoiceHistory: (clientId) => {
        return new Promise((resolve, reject) => {
            SalesInvoiceModel.find({'client._id': clientId}, '_id invoiceNo invoiceDate bargainNo seller')
                .then((invoices) => {
                    resolve(invoices);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}