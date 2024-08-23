const BargainPurchaseModel = require('../models/BargainPurchaseModel');
const OverflowStocksModel = require('../models/overflowStocksModel');
const Product = require('../models/productsModel');
const PurchaseInvoiceModel = require('../models/PurchaseInvoiceModel');

module.exports = {
    createPurchaseInvoice: (bargainId, purchasedProduct) => {
        return new Promise((resolve, reject) => {
            let hasErr = false;

            BargainPurchaseModel.findById(bargainId)
                .then(async(purchaseBargain) => {
                    if(purchaseBargain) {
                        if(purchasedProduct.length < 1) return reject('Product Quantity is Empty');
                        purchasedProduct.map((product) => {
                            if(!product.purchaseQty) product.purchaseQty = 0;
                            purchaseBargain.products.map((existProduct, index, existFullProduct) => {
                                if(product.productId === existProduct._id) {

                                    // Minus from bargainProduct qty
                                    if(product.purchaseQty < 0) {
                                        hasErr = true;
                                        return reject('Quantity is Invalid');
                                    }
                                    if(product.purchaseQty > existProduct.qty) {
                                        hasErr = true;
                                        return reject('Qty entered is more than Bargain Qty');
                                    }
                                    purchaseBargain.products[index].qty -= product.purchaseQty;

                                    // Add to purchaseBargain qty for record
                                    if(purchaseBargain.productPurchased[index].productId === product.productId) {
                                        purchaseBargain.productPurchased[index].qty = parseInt(purchaseBargain.productPurchased[index].qty) + parseInt(product.purchaseQty);
                                    }
                                }
                            })
                        })

                        // change status
                        let statusComplete = true;
                        purchaseBargain.products.map((product) => {
                            if(product.qty != 0) {
                                statusComplete = false;
                            }
                        })
                        if(statusComplete) purchaseBargain.status = 'complete';
                        else purchaseBargain.status = 'partial';

                        if(hasErr) {
                            return
                        }

                        // make changes in bargain entry
                        const {products, productPurchased, status} = purchaseBargain
                        try {
                            await BargainPurchaseModel.findByIdAndUpdate(purchaseBargain._id, {products, productPurchased, status})
                        } catch(err) {
                            console.log(err)
                        }

                        // Add Product qty to stock and minus from virtual qty
                        const updateProduct = purchasedProduct.map( async (product) => {
                            await Product.findById(product.productId)
                                .then( async ({qty, vQty}) => {
                                    await Product.findByIdAndUpdate(product.productId, {qty: qty + parseInt(product.purchaseQty), vQty: vQty - parseInt(product.purchaseQty)})
                                })
                        })
                        await Promise.all(updateProduct);

                        // make changes in overflow qty
                        const overflowQtyChanges = purchasedProduct.map( async (product) => {
                            await OverflowStocksModel.findOne({productId: product.productId})
                                    .then( async (overflowDoc) => {
                                        await Product.findById(product.productId).then( async (existProduct) => {
                                            overflowDoc.overflowQty = existProduct.vSoldQty - existProduct.qty;
                                            console.log(overflowDoc.overflowQty);
                                            if(overflowDoc.overflowQty < 0) {
                                                overflowDoc.overflowQty = 0;
                                            }
                                            try {
                                                await overflowDoc.save();
                                            } catch (err) {
                                                console.log(err);
                                            }

                                        })
                                    })
                        })
                        await Promise.all(overflowQtyChanges);

                        // Create Purchase Invoice entry
                        const invoiceNumber = `INV/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`;
                        const bargainNumber = purchaseBargain.bargainNo;
                        const locationId = purchaseBargain.location;
                        purchasedProduct.map((product, index) => {
                            purchasedProduct[index].purchaseQty = parseInt(purchasedProduct[index].purchaseQty);
                        })

                        const newPurchaseInvoice = new PurchaseInvoiceModel({
                            invoiceNo: invoiceNumber,
                            againstBargainNo: bargainNumber,
                            locationId: locationId,
                            products: purchasedProduct
                        })

                        try {
                            newPurchaseInvoice.save()
                        } catch(err) {
                            console.log(err)
                        }

                        resolve();
                    }
                })
        })
    },
    getAllPurchaseInvoice: () => {
        return new Promise((resolve, reject) => {
            PurchaseInvoiceModel.find({})
                .then((purchaseInvoices) => {
                    resolve(purchaseInvoices);
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    deleteOnePurchaseInvoice: (id) => {
        return new Promise((resolve, reject) => {
            PurchaseInvoiceModel.findByIdAndDelete(id)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}