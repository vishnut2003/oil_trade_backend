const purchaseHelpers = require('../helpers/purchaseHelpers')

const router = require('express').Router()

router.post('/create-purchase', (req, res) => {
    const purchaseEntry = req.body

    // set bargainDate in Date type
    const bargainDate = new Date(purchaseEntry.bargainDate);
    purchaseEntry.bargainDate = bargainDate

    // set location to id only
    purchaseEntry.location = purchaseEntry.location._id
    console.log(purchaseEntry);
})

router.post('/location/create', (req, res) => {
    purchaseHelpers.createLocation(req.body)
        .then(() => {
            res.status(200).send('Location created');
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.get('/location/get-all', (req, res) => {
    purchaseHelpers.getAllLocation()
        .then((locations) => {
            res.status(200).send(locations)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = router