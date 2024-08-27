const totalHelpers = require('../helpers/totalHelpers');

const router = require('express').Router();

router.post('/bargain-purchase', (req, res) => {
    totalHelpers.bargainPurchase(req.body.bargainId)
        .then((total) => {
            res.status(200).send(total.toString());
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/purchase-invoice', (req, res) => {
    totalHelpers.purchaseInvoice(req.body.purchaseId)
        .then((total) => {
            res.status(200).send(total.toString());
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/bargain-sales', (req, res) => {
    totalHelpers.bargainSales(req.body.bargainId)
        .then((total) => {
            res.status(200).send(total.toString());
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/sales-invoice', (req, res) => {
    totalHelpers.salesInvoice(req.body.invoiceId)
        .then((total) => {
            res.status(200).send(total.toString());
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

module.exports = router;