
import dotenv from 'dotenv'
import express from 'express';
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'
import morgan from 'morgan';
import orderRoute from './routes/orderRoutes.js';
import uploadRoute from './routes/uploadRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import checkMongo from './models/checkModel.js';
import razorPay from 'razorpay';
import crypto from 'crypto'
import path from 'path';


connectDB()

const app = express();
app.use(express.json())

dotenv.config()
// if(process.env.NODE_ENV === "development") {
//     app.use(morgan('env'))
// } 
// app.get('/', (req, res) => {
//     res.send('Hello');
// })
app.post('/api/check/', async (req, res) => {
    const checkStatus = new checkMongo(req.body)
    try {
        await checkStatus.save()
        res.send(checkStatus)
    } catch (err) {
        res.status(500).send(err)
    }
})
app.get('/api/check/', async (req, res) => {
    const checkStatus = await checkMongo({})
    try {
        res.send(checkStatus)
    } catch (err) {
        res.status(500).send(err)
    }
})
app.post('/api/pay/', async (req, res) => {
    // const value  = await req.body
    var instance = new razorPay({
        key_id: process.env.RAJORPAY_CLIENT_ID,
        key_secret: process.env.RAJORPAY_SECRET_KEY,
      });
      const options = {
        amount: req.body.totalPrice * 100, // amount == Rs 10
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 0,
   // 1 for automatic capture // 0 for manual capture
      };
      instance.orders.create(options, function(err, order) {
       return res.json(order)
      });
})

app.use('/api/products/', productRoute);
app.use('/api/users/', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/upload', uploadRoute);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if(process.env.NODE_ENV === "production" ) {
    console.log('x')
} else {
    app.get('/', (req, res) => {
        res.send('...Api is running')
    })
}

app.use(errorHandler);
app.use(notFound);
const port = process.env.PORT
app.listen(port, console.log(`${process.env.PORT} `))
module.exports = app