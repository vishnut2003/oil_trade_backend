const OverflowStocksModel = require("../models/overflowStocksModel")
const Product = require("../models/productsModel")

module.exports = {
    getOneProductByName: (name) => {
        return new Promise((resolve, reject) => {
            Product.findOne({ name })
                .then((product) => {
                    resolve(product)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    createOneProduct: (product) => {
        return new Promise( async (resolve, reject) => {
            const today = new Date().toISOString().substring(0, 10)
            const time = new Date().toLocaleTimeString().split(' ').join('_')
            product.prevPrice = [
                {
                    date: today + ' ' + time,
                    price: parseInt(product.price),
                    startPrice: true
                }
            ]
            const newProduct = new Product(product);
            let productId;
            try {
                productId = await newProduct.save()
            } catch (err) {
                reject(err)
            }

            const overflowStock = new OverflowStocksModel({ productId: productId._id, overflowQty: 0 })
            try {
                await overflowStock.save()
            } catch (err) {
                console.log(err);
            }

            resolve()
        })
    },
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            try {
                Product.find()
                    .then((products) => {
                        resolve(products)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } catch (err) {
                reject(err)
            }
        })
    },
    deleteOneProduct: (id) => {
        return new Promise((resolve, reject) => {
            try {
                Product.findByIdAndDelete(id)
                    .then((res) => {

                        // Delete from overflow stocks also
                        OverflowStocksModel.deleteOne({productId: id})
                            .then(() => {
                                resolve()
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } catch (err) {
                reject(err)
            }
        })
    },
    editOneProduct: ({ id, ...data }) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(async (product) => {
                    const today = new Date().toISOString().substring(0, 10)
                    const time = new Date().toLocaleTimeString().split(' ').join('_')
                    if (data.price && data.price != product.price) {
                        await Product.findByIdAndUpdate(id, {
                            prevPrice: [
                                ...product.prevPrice,
                                {
                                    date: today + ' ' + time,
                                    price: product.price
                                }
                            ]
                        })
                    }
                    Product.findByIdAndUpdate(id, data)
                            .then(() => {
                                resolve()
                            })
                            .catch((err) => {
                                reject(err)
                            })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}