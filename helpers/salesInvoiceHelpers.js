const BargainSalesModel = require("../models/BargainSalesModel");
const Product = require("../models/productsModel");
const SalesInvoiceModel = require("../models/SalesInvoiceModel");
const { addToOverQty } = require("./overflowStocksHelpers");

module.exports = {
    createSalesInvoice: (newInvoice) => {
        return new Promise(async (resolve, reject) => {
            let rejection = false;
            let productDeleted = false;

            // check if qty is valid
            const checkQtyOverflow = newInvoice.products.map(async (product, index) => {
                // convert all the String qty to numbers
                newInvoice.products[index].qty = parseInt(product.qty) || 0;

                const existProduct = await Product.findById(product._id);
                if(!existProduct || productDeleted) {
                    productDeleted = true;
                    return reject(`${product.name} is deleted!`);
                }

                // check if qty is overflow
                if (parseInt(product.qty) > existProduct.qty) {
                    rejection = true;
                    return reject(`Order Quantity not Enough! - ${existProduct.name}`);
                }

                // Check if qty is invalid
                if (parseInt(product.qty) < 0) {
                    rejection = true;
                    return reject('Order Quantity is Invalid!');
                }

                // convert all the String qty to numbers
                newInvoice.products[index].qty = parseInt(product.qty);
            })
            await Promise.all(checkQtyOverflow)

            // check if qty is more that bargain qty
            const existBargain = await BargainSalesModel.findOne({bargainNo: newInvoice.bargainNo})
            const checkBargainProduct = existBargain.products.map((bargainProduct) => {
                const checkInvoiceProduct = newInvoice.products.map((product) => {
                    if(bargainProduct._id === product._id) {
                        if(product.qty > bargainProduct.qty) {
                            rejection = true;
                            return reject('Order qty is not valid');
                        }
                    }
                })
                Promise.all(checkInvoiceProduct)
            })
            Promise.all(checkBargainProduct);

            if (rejection) return;

            // Exit if product is deleted with error
            if (productDeleted) return;

            // Minus qty from stock & Minus vSoldQty
            const minusQtyFromStock = newInvoice.products.map(async (product) => {
                await Product.findById(product._id).then(async (existProduct) => {
                    // Minus qty from stock
                    existProduct.qty -= product.qty;
                    
                    // Minus vSoldQty From Stock
                    existProduct.vSoldQty -= product.qty;
                    
                    // Save the modified product
                    try {
                        await existProduct.save()
                    } catch (err) {
                        console.log(err);
                    }
                })
            })
            await Promise.all(minusQtyFromStock);

            // Refresh overflow qty of product
            const refreshOverflowQty = newInvoice.products?.map( async (product) => {
                const existProduct = await Product.findById(product._id);
                await addToOverQty(existProduct.qty, existProduct.vSoldQty, product._id);
                return;
            })
            await Promise.all(refreshOverflowQty);

            // minus qty from bargain
            await BargainSalesModel.findOne({ bargainNo: newInvoice.bargainNo })
                .then(async (bargain) => {
                    const minusQtyFromBargain = newInvoice.products.map(async (product) => {
                        const bargainProduct = bargain.products.map(async (bargainProduct, index) => {
                            if (bargainProduct._id === product._id) {
                                bargain.products[index].qty = parseInt(bargain.products[index].qty) - parseInt(product.qty);
                            }
                        })
                        await Promise.all(bargainProduct);
                    })
                    await Promise.all(minusQtyFromBargain);
                    try {
                        await BargainSalesModel.findByIdAndUpdate(bargain._id, { products: bargain.products })
                    } catch (err) {
                        console.log(err);
                    }
                })

            // change bargain Status
            await BargainSalesModel.findOne({ bargainNo: newInvoice.bargainNo })
                .then(async (bargain) => {
                    let partial = false;
                    const checkAllProducts = bargain.products.map((product) => {
                        if (product.qty > 0) {
                            partial = true;
                        }
                    })
                    await Promise.all(checkAllProducts);
                    if (partial) {
                        bargain.status = 'partial';
                    } else {
                        bargain.status = 'complete';
                    }
                    try {
                        await bargain.save()
                    } catch (err) {
                        return console.log(err);
                    }
                })

            // Save sales Invoice

            const invoiceNo = `INV/S/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`
            newInvoice.invoiceNo = invoiceNo;
            const invoiceDoc = new SalesInvoiceModel(newInvoice);
            try {
                await invoiceDoc.save();
            } catch (err) {
                return console.log(err);
            }

            resolve();
        })
    },
    getAllInvoices: () => {
        return new Promise((resolve, reject) => {
            SalesInvoiceModel.find({}).then((invoices) => {
                resolve(invoices);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    getOneInvoice: (invoiceId) => {
        return new Promise((resolve, reject) => {
            SalesInvoiceModel.findById(invoiceId)
                .then((invoice) => {
                    resolve(invoice);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    },
    deleteOneInvoice: (invoiceId) => {
        return new Promise((resolve, reject) => {
            SalesInvoiceModel.findByIdAndDelete(invoiceId)
                .then((invoice) => {
                    resolve(invoice.invoiceNo);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }
}