const bargainSalesHelpers = require('../helpers/bargainSalesHelpers');

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

module.exports = router;