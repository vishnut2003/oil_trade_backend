const BargainSalesModel = require("../models/BargainSalesModel");
const Product = require("../models/productsModel");
const SalesLocationModel = require("../models/SalesLocationModel");
const overflowStocksHelpers = require("./overflowStocksHelpers");

module.exports = {
    createOneLocation: (newLocation) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findOne({ location: newLocation.location })
                .then((existLocation) => {
                    if (existLocation) return reject('Location already exist!');
                    const newLocationModel = new SalesLocationModel(newLocation);
                    try {
                        newLocationModel.save();
                    } catch (err) {
                        console.log(err);
                        return
                    }

                    resolve();
                })
        })
    },
    getAllLocation: () => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.find({})
                .then((locations) => {
                    resolve(locations)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    },
    updateOneLocation: ({ id, ...updatedLocation }) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findByIdAndUpdate(id, updatedLocation)
                .then(() => {
                    resolve('Changes saved successfully!');
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    deleteOneLocation: ({ locationId }) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findByIdAndDelete(locationId)
                .then(() => {
                    resolve('Location deleted');
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    createBargainSales: (newEntry) => {
        return new Promise(async (resolve, reject) => {

            let bargainNoExist = false;

            await BargainSalesModel.findOne({ bargainNo: newEntry.bargainNo })
                .then(async (existBargain) => {
                    if (existBargain) {
                        bargainNoExist = true;
                        return;
                    } else {
                        const parseAllToInt = newEntry.products.map((product, index) => {
                            newEntry.products[index].qty = parseInt(product.qty)
                        })
                        await Promise.all(parseAllToInt);
                        const bargainNewEntry = new BargainSalesModel(newEntry)
                        try {
                            await bargainNewEntry.save();
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })

            if (bargainNoExist) return reject('Bargain No. Already exist');

            // Check product availibility and if no stock add to Overflow Stock
            newEntry.products.map(async (product, index) => {
                await Product.findById(product._id)
                    .then(async (existProduct) => {

                        await Product.findByIdAndUpdate(product._id, { vSoldQty: parseInt(existProduct.vSoldQty) + parseInt(product.qty) })
                        const oversoldProduct = await Product.findById(product._id);
                        await overflowStocksHelpers.addToOverQty(oversoldProduct.qty, oversoldProduct.vSoldQty, oversoldProduct._id);

                        if (index === newEntry.products.length - 1) {
                            resolve(newEntry.bargainNo);
                        }

                    })
            })

        })
    },
    getAllBargainSales: () => {
        return new Promise((resolve, reject) => {
            BargainSalesModel.find({}).then((bargains) => {
                resolve(bargains);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    getOneBargain: (bargainId) => {
        return new Promise((resolve, reject) => {
            BargainSalesModel.findById(bargainId)
                .then((salesBargain) => {
                    resolve(salesBargain);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    deleteOneBargain: (bargainId) => {
        return new Promise((resolve, reject) => {

            // Miun from vSoldQty


            // refresh overflow stock

            BargainSalesModel.findByIdAndDelete(bargainId)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}