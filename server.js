
import dotenv from 'dotenv'
import express from 'express';
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import checkMongo from './models/checkModel.js';
import razorPay from 'razorpay';
import crypto from 'crypto'


connectDB()

const app = express();
app.use(express.json())
dotenv.config()

app.get('/', (req, res) => {
    res.send('Hello');
})
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
// app.post('/api/payment', async(req, res) => {
//     console.log(req.body.values, 'pay ment - options')
//     const payId = req.body.values.payId;
//     const orderId = req.body.values.orderId;
//     const signature = req.razorpay_signature
//     const generated_signature = crypto.createHmac('sha256', process.env.RAJORPAY_SECRET_KEY)
//     generated_signature.update(orderId + "|" + payId)
//     // if ( generated_signature.digest('hex') === signature){
//     //     const transaction = new Transaction({
//     //       transactionid:req.body.transactionid,
//     //       transactionamount:req.body.transactionamount,
//     //     });
//     //     transaction.save(function(err, savedtransac){
//     //         if(err){
//     //             console.log(err);
//     //             return res.status(500).send("Some Problem Occured");
//     //         }
//     //         res.send({transaction: savedtransac});
//     //     });
//     // }
// })
app.use('/api/products/', productRoute);
app.use('/api/users/', userRoute);
app.use('/api/order', orderRoute);

// app.get('/api/config/paypal', (req, res) => {
//     res.send(process.env.PAYPAL_CLIENT_ID)
//     console.log('vijay')
// })
// app.get('/api/products', (req, res) => {
//     res.json(products);
// })
// app.get('/api/products/:id', (req,res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// })

app.use(errorHandler);
app.use(notFound);
const port = process.env.PORT
app.listen(port, console.log(`${process.env.PORT} `))