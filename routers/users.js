const express = require('express');
const router = express.Router();

const { getDB } = require('../database/dbConn');
const User = require('../models/userModel')

router.get('/', async (req, res) => {
    try {
        User.find({}).then((users) => {
            res.status(200).json(users);
        })
    } catch (err) {
        res.status(500).json({ message: 'Something Went Wrong' });
    }
})

router.post('/add', async (req, res) => {
    const userData = req.body;

    try {
        const user = new User(userData);
        await user.save();
    } catch (err) {
        if (err.code === 11000) {
            const errorField = Object.keys(err.keyValue);
            const errorMessage = `${errorField[0]} Already Exist!`
            return res.status(409).json({ message: errorMessage })
        }
    }

    return res.status(200).json({
        message: 'User created successfully'
    })
})

router.post('/delete', async (req, res) => {

    await User.findByIdAndDelete(req.body.id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({message: 'Something went wrong'});
        })
})

module.exports = router;