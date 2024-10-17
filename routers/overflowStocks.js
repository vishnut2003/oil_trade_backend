const overflowStocksHelpers = require('../helpers/overflowStocksHelpers');

const router = require('express').Router();

router.get('/all', (req, res) => {
    overflowStocksHelpers.getAllOverflowProductIds()
    res.send('working')
})

module.exports = router;