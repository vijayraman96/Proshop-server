import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async() => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        conn.then((resp) => {
            console.log('database connected')
        })
    } catch(err) {
        console.log(err.message, 'blasted');
        process.exit(1)
    }
}

export default connectDB;