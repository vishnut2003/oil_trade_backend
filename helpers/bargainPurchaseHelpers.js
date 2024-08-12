const PurchaseLocation = require("../models/purchaseLocationModel")
const BargainPurchaseModel = require("../models/BargainPurchaseModel")

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
            BargainPurchaseModel.findOne({bargainNo: purchaseEntry.bargainNo})
                .then( async (purchaseExist) => {
                    if(purchaseExist) return reject('Bargain number already exist!');

                    // make productPurchased Array
                    let purchasedProduct = purchaseEntry.products.filter((product) => {
                        return {name: product.name, productId: product._id, qty: 0}
                    })

                    purchaseEntry.productPurchased = purchasedProduct;              

                    const purchase = new BargainPurchaseModel(purchaseEntry);
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
            BargainPurchaseModel.find()
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
    },
    editOneLocation: ({id, ...updatedLocation}) => {
        return new Promise((resolve, reject) => {
            PurchaseLocation.findByIdAndUpdate(id, updatedLocation)
                .then((res) => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    getOneLocation: (id) => {
        return new Promise((resolve, reject) => {
            PurchaseLocation.findById(id)
                .then((location) => {
                    resolve(location)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    deleteOnePurchase: (id) => {
        return new Promise((resolve, reject) => {
            BargainPurchaseModel.findByIdAndDelete(id)
                .then((res) => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    } 
}