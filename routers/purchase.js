const purchaseHelpers = require('../helpers/purchaseHelpers')

const router = require('express').Router()

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