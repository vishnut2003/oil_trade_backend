const BargainPurchaseModel = require("../models/BargainPurchaseModel");
const BargainSalesModel = require("../models/BargainSalesModel");
const PurchaseInvoiceModel = require("../models/PurchaseInvoiceModel");
const SalesInvoiceModel = require("../models/SalesInvoiceModel");

module.exports = {
    bargainPurchase: (id) => {
        return new Promise((resolve, reject) => {
            BargainPurchaseModel.findById(id)
                .then(async (bargain) => {
                    let total = 0;
                    const calculateProduct = bargain.products.map((product) => {
                        total += product.price * product.qty;
                    })
                    await Promise.all(calculateProduct);
                    resolve(total);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    purchaseInvoice: (id) => {
        return new Promise((resolve, reject) => {
            PurchaseInvoiceModel.findById(id)
                .then(async (invoice) => {
                    let total = 0;
                    const checkProducts = invoice.products.map((product) => {
                        total += product.purchaseQty * product.price;
                    })
                    await Promise.all(checkProducts);
                    resolve(total)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    bargainSales: (id) => {
        return new Promise((resolve, reject) => {
            BargainSalesModel.findById(id)
                .then(async (bargain) => {
                    let total = 0;
                    const checkProducts = bargain.products.map((product) => {
                        total += product.price * product.qty;
                    })
                    await Promise.all(checkProducts);
                    total -= bargain.discount;
                    resolve(total);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    salesInvoice: (id) => {
        return new Promise((resolve, reject) => {
            SalesInvoiceModel.findById(id)
                .then( async (invoice) => {
                    let total = 0;
                    const checkProduct = invoice.products.map((product) => {
                        total += product.price * product.qty;
                    })
                    await Promise.all(checkProduct);
                    total -= invoice.discount;
                    resolve(total);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}