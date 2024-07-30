const PurchaseLocation = require("../models/purchaseLocationModel")

module.exports = {
    createLocation: ({ address, location }) => {
        return new Promise((resolve, reject) => {
            PurchaseLocation.findOne({ location })
                .then(async (existLocation) => {
                    if (existLocation) return reject('Location already exist!')
                    const locationDoc = new PurchaseLocation({ address: address, location: location })
                    await locationDoc.save()
                    resolve()
                })
        })
    },
    getAllLocation: () => {
        return new Promise((resolve, reject) => {
            PurchaseLocation.find()
                .then((locations) => {
                    resolve(locations)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}