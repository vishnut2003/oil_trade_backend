const OverflowStocksModel = require("../models/overflowStocksModel");
const Product = require("../models/productsModel");

module.exports = {
    addToOverQty: (stock, vSoldStock, productId) => {
        return new Promise(async (resolve, reject) => {
            const diff = stock < vSoldStock ? vSoldStock - stock : 0;
            OverflowStocksModel.findOne({productId})
                .then(async (overflowStock) => {
                    if(overflowStock) {
                        overflowStock.overflowQty = diff;
                        try{
                            await overflowStock.save();
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        const newOverflowStock = new OverflowStocksModel({
                            productId: productId,
                            overflowQty: diff
                        });
                        
                        try {
                            await newOverflowStock.save();
                        } catch (err) {
                            console.log(err);
                        }
                    }

                    resolve();
                })
        })
    },
    getAllOverflowProductIds: () => {
        return new Promise((resolve, reject) => {
            OverflowStocksModel.find({}).then((overflowProducts) => {
                const takeAllProducts = overflowProducts.map((overflowProduct) => {
                    console.log(overflowProduct);
                })
            })
        })
    }
}