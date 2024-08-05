const purchaseHelpers = require('../helpers/purchaseHelpers')

const router = require('express').Router()

router.post('/create-purchase', (req, res) => {
    const purchaseEntry = req.body

    // set bargainDate in Date type
    const bargainDate = new Date(purchaseEntry.bargainDate);
    purchaseEntry.bargainDate = bargainDate

    // set location to id only
    purchaseEntry.location = purchaseEntry.location._id

    // convert qty, price, w in MT to numbers
    purchaseEntry.products.map((product, index) => {
        purchaseEntry.products[index].qty = parseInt(product.qty)
        purchaseEntry.products[index].price = parseInt(product.price)
        purchaseEntry.products[index].weightInMT = parseInt(product.weightInMT)
    })

    purchaseHelpers.createPurchase(purchaseEntry)
        .then((resopnse) => {
            res.status(200).send(resopnse)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.get('/get-all', (req, res) => {
    purchaseHelpers.getAllPurchase()
        .then((purchases) => {
            res.status(200).send(purchases);
        })
        .catch((err) => {
            res.status(500).send(err)
        })
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

router.post('/location/delete-one', (req, res) => {
    purchaseHelpers.deleteOneLocation(req.body.locationId)
        .then(() => {
            res.status(200).send('Location Deleted')
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

module.exports = router