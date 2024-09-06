const BargainPurchaseModel = require("../models/BargainPurchaseModel");

module.exports = {
    bargainPurchasesTotal: (year_month) => {
        return new Promise( async (resolve, reject) => {
            // get all bargain purchases of current month
            const BargainPurchases = await BargainPurchaseModel.find({})
            const filterBargainByMonth = BargainPurchases.filter((bargain) => {
                if (bargain.createdAt.toISOString().substring(0, 7) === year_month) {
                    return bargain;
                }
            })
            await Promise.all(filterBargainByMonth);

            // calculate totals
            let bargainSum = 0;

            // Calculate in all bargains
            const calculateEachBargain = filterBargainByMonth.map(async (bargain) => {
                // calculate in each product of bargain
                const calculateEachProduct = bargain.products.map((product) => {
                    bargainSum += product.price * product.qty;
                    return;
                })
                await Promise.all(calculateEachProduct);
            })
            await Promise.all(calculateEachBargain)
            resolve(bargainSum);
        })
    },
    purchaseInvoiceTotal: (year_month) => {
        return new Promise((resolve, reject) => {
            console.log(year_month);
        })
    }
}