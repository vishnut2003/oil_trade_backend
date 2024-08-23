const BargainSalesModel = require("../models/BargainSalesModel");
const Product = require("../models/productsModel");
const SalesInvoiceModel = require("../models/SalesInvoiceModel");

module.exports = {
    createSalesInvoice: (newInvoice) => {
        return new Promise(async (resolve, reject) => {
            let rejection = false;

            // check if qty is valid
            const checkQtyOverflow = newInvoice.products.map(async (product, index) => {
                // convert all the String qty to numbers
                newInvoice.products[index].qty = parseInt(product.qty) || 0;

                const existProduct = await Product.findById(product._id);

                // check if qty is overflow
                if (parseInt(product.qty) > existProduct.qty) {
                    rejection = true;
                    return reject(`Order Quantity Error! - ${existProduct.name}`);
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
            if (rejection) return;

            // Minus qty from stock
            const minusQtyFromStock = newInvoice.products.map(async (product) => {
                await Product.findById(product._id).then(async (existProduct) => {
                    existProduct.qty -= product.qty;
                    try {
                        await existProduct.save()
                    } catch (err) {
                        console.log(err);
                    }
                })
            })
            await Promise.all(minusQtyFromStock);

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
                        console.log(err);
                    }
                })

            // Save sales Invoice

            const invoiceNo = `INV/S/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`
            newInvoice.invoiceNo = invoiceNo;
            const invoiceDoc = new SalesInvoiceModel(newInvoice);
            try {
                await invoiceDoc.save();
            } catch (err) {
                console.log(err);
            }
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