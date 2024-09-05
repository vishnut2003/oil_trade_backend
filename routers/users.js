const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const usersHelpers = require('../helpers/usersHelpers');

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
    const saltRound = parseInt(process.env.PASSWORD_SALT_ROUND);

    // hash the password
    bcrypt.genSalt(saltRound)
        .then((salt) => {
            bcrypt.hash(userData.password, salt)
                .then( async (encryPassword) => {
                    userData.password = encryPassword;
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
        })
})

router.post('/delete', async (req, res) => {

    await User.findByIdAndDelete(req.body.id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Something went wrong' });
        })
})

router.post('/get-one', (req, res) => {
    usersHelpers.getOneUser(req.body.userId)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/update-one', (req, res) => {
    usersHelpers.updateOneUser(req.body)
        .then((message) => {
            res.status(200).send(message);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

router.post('/update-password', (req, res) => {
    usersHelpers.updatePassword(req.body)
        .then(() => {
            res.status(200).send('Password updated successfully')
        })
        .catch((err) => {
            res.status(err);
        })
})

module.exports = router;