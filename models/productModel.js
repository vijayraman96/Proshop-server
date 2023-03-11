import mongoose from 'mongoose';
const reviewSchema = mongoose.Schema({
    name: {type: String},
    rating: {type: Number},
    comment: {type: String},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})
const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true
    },
    review: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }, 
    price: {
        type: Number,
        required: true,
        default: 0
    }, 
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }, 
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
console.log('review Schema', Product)
export default Product;
