const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./database/dbConn');
const morgan = require('morgan');

require('dotenv').config();

// Routers
const userRouter = require('./routers/users');

const PORT = process.env.PORT || 3500;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('common'))

app.use('/users', userRouter);

// Database
connectDB((res) => {
    console.log(res);
    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`);
    });
})