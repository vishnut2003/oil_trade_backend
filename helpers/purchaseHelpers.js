const PurchaseLocation = require("../models/purchaseLocationModel")
const PurchaseModel = require("../models/purchaseModel")

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
    },
    createPurchase: (purchaseEntry) => {
        return new Promise((resolve, reject) => {
            PurchaseModel.findOne({bargainNo: purchaseEntry.bargainNo})
                .then( async (purchaseExist) => {
                    if(purchaseExist) return reject('Bargain number already exist!');
                    const purchase = new PurchaseModel(purchaseEntry);
                    try {
                        await purchase.save()
                        resolve(`Purchase created with Bargain No. ${purchaseEntry.bargainNo}`);
                    } catch (err) {
                        reject('Saving purchase entry error!');
                    }
                })            
        })
    },
    getAllPurchase: () => {
        return new Promise((resolve, reject) => {
            PurchaseModel.find()
                .then((purchases) => {
                    resolve(purchases);
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    deleteOneLocation: (id) => {
        return new Promise((resolve, reject) => {
            PurchaseLocation.findByIdAndDelete(id)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}