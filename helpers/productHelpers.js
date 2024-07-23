const Product = require("../models/productsModel")

module.exports = {
    getOneProductByName: (name) => {
        return new Promise((resolve, reject) => {
            Product.findOne({name})
                .then((product) => {
                    resolve(product)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    createOneProduct: (product) => {
        return new Promise((resolve, reject) => {
            const newProduct = new Product(product);
            try {
                newProduct.save()
            } catch (err) {
                reject(err)
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
                        resolve()
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } catch (err) {
                reject(err)
            }
        })
    }
}