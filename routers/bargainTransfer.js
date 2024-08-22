const bargainTransferHelpers = require('../helpers/bargainTransferHelpers');

const router = require('express').Router();

router.post('/create', (req, res) => {
    bargainTransferHelpers.changeToNewBargain(req.body);
})

module.exports = router;