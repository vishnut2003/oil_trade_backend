const clientsHelpers = require('../helpers/clientsHelpers');

const router = require('express').Router();

router.post('/create-one', (req, res) => {
    clientsHelpers.createOneClient(req.body)
        .then(() => {
            res.status(200).send('Client created!');
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

router.get('/get-all', (req, res) => {
    clientsHelpers.getAllClients()
        .then((clients) => {
            res.status(200).send(clients);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/delete-one', (req, res) => {
    clientsHelpers.deleteOneClient(req.body.clientId)
        .then(() => {
            res.status(200).send('Client deleted successfully');
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/edit-one', (req, res) => {
    clientsHelpers.updateOneClient(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/bargain-history', (req, res) => {
    clientsHelpers.getAllBargainHistory(req.body.clientId)
        .then((histories) => {
            res.status(200).send(histories);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/invoice-history', (req, res) => {
    clientsHelpers.getAllInvoiceHistory(req.body.clientId)
        .then((invoices) => {
            res.status(200).send(invoices);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

module.exports = router;