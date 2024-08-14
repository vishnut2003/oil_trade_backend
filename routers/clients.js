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

module.exports = router;