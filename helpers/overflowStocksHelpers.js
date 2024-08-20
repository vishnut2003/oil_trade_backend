const OverflowStocksModel = require("../models/overflowStocksModel")

module.exports = {
    addToOverQty: (productId, diffQty) => {
        return new Promise(async (resolve, reject) => {
            await OverflowStocksModel.findOne({productId}).then(async(existStock) => {
                if(existStock) {
                    existStock.overflowQty += diffQty
                    try {
                        await existStock.save();
                        
                    } catch (err) {
                        return console.log(err);
                    }

                    resolve();
                } else {
                    const newOverflowStockEntry = new OverflowStocksModel({
                        productId: productId,
                        overflowQty: diffQty
                    })
                    try {
                        await newOverflowStockEntry.save();
                    } catch (err) {
                        return console.log(err);
                    }

                    resolve();
                }
            })
        })
    }
}