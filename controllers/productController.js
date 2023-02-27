import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products)
})
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'});
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const {user, name, image, brand, category, description, review, rating, numReviews, price, countInStock} = req.body;

    const product = await Product.create({
        user, 
        name,
        image,
        brand,
        category,
        description,
        rating,
        numReviews,
        price, 
        countInStock,
        review
    })
    if(product) {
        res.status(201).json({
            _id: product._id,
            user: product.user, 
            name: product.name,
            image: product.image,
            brand: product.brand,
            category: product.category,
            description: product.description,
            rating: product.rating,
            numReviews: product.numReviews,
            price: product.price, 
            countInStock: product.countInStock,
            review: product.review
        })
    } else {
        res.status(400)
        throw new Error('User registartion failed')
    }
})

export {getProducts, getProductById, updateProduct}