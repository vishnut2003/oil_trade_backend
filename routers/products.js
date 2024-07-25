const productHelpers = require('../helpers/productHelpers')
const router = require('express').Router()

router.post('/create', (req, res) => {
    productHelpers.getOneProductByName(req.body.name)
        .then((product) => {
            if(product) return res.status(400).send('Product already exist!')
            
            productHelpers.createOneProduct(req.body)
                .then(() => {
                    res.status(200).send('Product Created')
                })
                .catch((err) => {
                    res.status(500).send(err)
                })
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

router.get('/all', (req, res) => {
    productHelpers.getAllProducts()
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

router.get('/delete/:id', (req, res) => {
    productHelpers.deleteOneProduct(req.params.id)
        .then(() => {
            res.status(200).send('Product deleted successfully!')
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

router.post('/edit-single', (req, res) => {
    productHelpers.editOneProduct(req.body)
        .then(() => {
            res.status(200).send('Product Updated Successfully!')
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.get('/date-filter/:date', async (req, res) => {
    const date = new Date(req.params.date)
    const today = new Date()
    if(date.toISOString().substring(0, 10) === today.toISOString().substring(0, 10)) {
        await productHelpers.getAllProducts()
            .then((products) => {
                return res.status(200).send(products)
            })
    } else {
        productHelpers.getAllProductsByDate(date)
    }   
})

module.exports = router