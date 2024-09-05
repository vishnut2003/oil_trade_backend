const User = require("../models/userModel");
const bcrypt = require('bcrypt');

module.exports = {
    getOneUser: (userId) => {
        return new Promise((resolve, reject) => {
            User.findById(userId, {name: 1, username: 1, email: 1, role: 1}).then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            })
        })
    },
    updateOneUser: ({_id, ...updatedUser}) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(_id, updatedUser)
                .then(() => {
                    resolve('User updated successfully');
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    updatePassword: ({updatedPassword, userId}) => {
        return new Promise((resolve, reject) => {
            // encrypt the password
            const saltRound = parseInt(process.env.PASSWORD_SALT_ROUND);
            bcrypt.genSalt(saltRound)
                .then((salt) => {
                    bcrypt.hash(updatedPassword, salt)
                        .then((hashedPassword) => {
                            User.findByIdAndUpdate(userId, {password: hashedPassword})
                                .then(() => {
                                    resolve()
                                })
                                .catch((err) => {
                                    reject(err);
                                })
                        })
                        .catch((err) => {
                            reject(err);
                        })
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}