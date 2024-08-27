const BargainPurchaseModel = require("../models/BargainPurchaseModel")

module.exports = {
    changeToNewBargain: (transferDetails) => {
        return new Promise( async (resolve, reject) => {
            // check if new bargain No. exist
            const existBargainNo = await BargainPurchaseModel.findOne({ bargainNo: transferDetails.newBargainNo })
            if(existBargainNo) return reject('Bargain No. already exist!');

            // convert all products price string to int
            const intConvert = transferDetails.products.map((product, index) => {
                transferDetails.products[index].price = parseInt(product.price);
            })
            await Promise.all(intConvert);

            console.log(transferDetails);

            // update the bargain
        })
    }
}