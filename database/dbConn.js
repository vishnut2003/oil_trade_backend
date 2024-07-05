const mongoose = require('mongoose');

const state = {
    mongoose: null
}

const connectDB = async (done) => {
    const DB_URL = process.env.DB_URL;

    if(!DB_URL) {
        throw new Error('Please check DB_URL in environment variables');
    }
    await mongoose.connect(DB_URL).then((mongooseClient) => {
        state.mongoose = mongooseClient;
        done('Database connected successfully');
    })

}

const getDB = () => {
    return state.mongoose;
}

module.exports = { connectDB, getDB };