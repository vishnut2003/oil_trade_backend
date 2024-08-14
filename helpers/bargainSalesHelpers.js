const SalesLocationModel = require("../models/SalesLocationModel")

module.exports = {
    createOneLocation: (newLocation) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findOne({ location: newLocation.location })
                .then((existLocation) => {
                    if (existLocation) return reject('Location already exist!');
                    const newLocationModel = new SalesLocationModel(newLocation);
                    try {
                        newLocationModel.save();
                    } catch (err) {
                        console.log(err);
                        return
                    }

                    resolve();
                })
        })
    },
    getAllLocation: () => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.find({})
                .then((locations) => {
                    resolve(locations)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    },
    updateOneLocation: ({ id, ...updatedLocation }) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findByIdAndUpdate(id, updatedLocation)
                .then(() => {
                    resolve('Changes saved successfully!');
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    deleteOneLocation: ({locationId}) => {
        return new Promise((resolve, reject) => {
            SalesLocationModel.findByIdAndDelete(locationId)
                .then(() => {
                    resolve('Location deleted');
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}