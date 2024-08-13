const purchaseHelpers = require('../helpers/bargainPurchaseHelpers');
const purchaseInvoiceHelpers = require('../helpers/purchaseInvoiceHelpers');

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

router.post('/delete-one', (req, res) => {
    purchaseHelpers.deleteOnePurchase(req.body.purchaseId)
        .then(() => {
            res.status(200).send('purchase deleted!');
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

router.post('/location/get-one', (req, res) => {
    purchaseHelpers.getOneLocation(req.body.locationId)
        .then((location) => {
            res.status(200).send(location);
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

router.post('/location/edit', (req, res) => {
    purchaseHelpers.editOneLocation(req.body)
        .then(() => {
            res.status(200).send('Changes saved!');
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

// Purchase Invoice Start
router.post('/purchase-invoice/create', (req, res) => {
    const {_id, qtyPurchased} = req.body;
    purchaseInvoiceHelpers.createPurchaseInvoice(_id, qtyPurchased)
        .then(() => {
            res.status(200).send('Purchase Invoice Created!');
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

router.get('/purchase-invoice/get-all', (req, res) => {
    purchaseInvoiceHelpers.getAllPurchaseInvoice()
        .then((invoices) => {
            res.status(200).send(invoices);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

router.post('/purchase-invoice/delete-one', (req, res) => {
    purchaseInvoiceHelpers.deleteOnePurchaseInvoice(req.body.purchaseInvoiceId)
        .then(() => {
            res.status(200).send('Purchase Deleted!');
        })
        .catch((err) => {
            res.status(400).send(err);
        })
})

module.exports = router