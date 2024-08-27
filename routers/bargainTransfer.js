const bargainTransferHelpers = require('../helpers/bargainTransferHelpers');

const router = require('express').Router();

router.post('/create', (req, res) => {
    bargainTransferHelpers.changeToNewBargain(req.body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

module.exports = router;