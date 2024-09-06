const reportsHelpers = require('../helpers/reportsHelpers');

const router = require('express').Router();

router.get('/totals', (req, res) => {
    const currYearMonth = new Date().toISOString().substring(0, 7);
    reportsHelpers.bargainPurchasesTotal(currYearMonth)
        .then((bargainSum) => {
            console.log(bargainSum);
            reportsHelpers.purchaseInvoiceTotal(currYearMonth)
        })
})


module.exports = router;