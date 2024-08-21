const bargainSalesHelpers = require('../helpers/bargainSalesHelpers');
const salesInvoiceHelpers = require('../helpers/salesInvoiceHelpers');

const router = require('express').Router();

router.post('/location/create-one', (req, res) => {
    bargainSalesHelpers.createOneLocation(req.body)
        .then(() => {
            res.status(200).send('Location Created!');
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

router.get('/location/get-all', (req, res) => {
    bargainSalesHelpers.getAllLocation()
        .then((locations) => {
            res.status(200).send(locations);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/location/edit', (req, res) => {
    bargainSalesHelpers.updateOneLocation(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/location/delete-one', (req, res) => {
    bargainSalesHelpers.deleteOneLocation(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

router.post('/bargain/create', (req, res) => {
    bargainSalesHelpers.createBargainSales(req.body)
        .then((bargainNo) => {
            res.status(200).send(`Sales Bargain created with Bargain No. ${bargainNo}`);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

router.get('/bargain/get-all', (req, res) => {
    bargainSalesHelpers.getAllBargainSales().then((bargains) => {
        res.status(200).send(bargains);
    })
    .catch((err) => {
        res.status(500).send(err);
    })
})

router.post('/bargain/get-one', (req, res) => {
    bargainSalesHelpers.getOneBargain(req.body.salesBargainId)
        .then((salesBargain) => {
            res.status(200).send(salesBargain);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/bargain/delete-one', (req, res) => {
    bargainSalesHelpers.deleteOneBargain(req.body.bargainId)
        .then(() => {
            res.status(200).send('Sales Bargain deleted!');
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/invoice/create', (req, res) => {
    salesInvoiceHelpers.createSalesInvoice(req.body)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;