const ClientsModel = require("../models/clientsModel");

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
    }
}