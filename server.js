const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./database/dbConn');
const morgan = require('morgan');

require('dotenv').config();

// Routers
const userRouter = require('./routers/users');
const productRouter = require('./routers/products');
const purchaseRouter = require('./routers/purchase');
const clientsRouter = require('./routers/clients');
const salesRouter = require('./routers/sales');

const PORT = process.env.PORT || 3500;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/purchase', purchaseRouter);
app.use('/clients', clientsRouter);
app.use('/sales', salesRouter);

// Database
connectDB((res) => {
    console.log(res);
    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`);
    });
})