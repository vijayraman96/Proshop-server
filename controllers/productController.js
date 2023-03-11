import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const getProducts = asyncHandler(async(req, res) => {
    console.log('req.query.keyword', req.query.url)
    let url = req.query.url;
    console.log(url)
    let keyword;
    let page;
    if(url) {
        if(url.includes('/search')) {
            const searchBarUrl = url.match('/search');

            keyword = {
                name: {
                    $regex: searchBarUrl.input.slice(8),
                    $options: 'i'
                }
            }
                
        } else if(url.includes('/page')) {
            const pageUrl = url.match('/page')
            page = Number(pageUrl && pageUrl.input.slice(6)) || 1
            keyword = {}
        } else if (url.includes('/admin/productlist')){
            const adminPageUrl = url.match('/admin/productlist')
            console.log(adminPageUrl, 'adminPageUrl', adminPageUrl.input.slice(19))
            page =  Number(adminPageUrl && adminPageUrl.input.slice(19)) || 1;
            keyword = {}
        } else {
            page = 1;
            keyword = {}
        }
    }

    console.log(keyword, 'page', page)
    const pageSize = 2;
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    console.log(products);
    res.json({products, page, pages: Math.ceil(count/pageSize)})
})
const getProductById = asyncHandler(async(req, res) => {
    const id = (req.params.id).trim()
    const product = await Product.findById(id);
    if(product) {
        res.json(product)
    } else {
        res.status(404).json({message: 'Product not found'});
    }
})
const deleteProduct = asyncHandler(async(req, res) => {
    const id = (req.params.id).trim()
    console.log('id', id)
    const product = await Product.findById(id)
    if(product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
})
const createProduct = asyncHandler(async (req, res) => {
    const {user, name, image, brand, category, description, review, rating, numReviews, price, countInStock} = req.body;

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })
    const createdProduct = await product.save()
    if(createdProduct) {
        res.status(201).json(createdProduct)
    } else {
        res.status(400)
        throw new Error('User registartion failed')
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const {user, name, image, brand, category, description, review, rating, numReviews, price, countInStock} = req.body;
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not founc')
    }
})
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id)
    console.log(product)
    if(product) {
        const alreadyReviewed  = product.review
       if(alreadyReviewed.length != 0) {
        res.status(400)
        throw new Error('product already reviewed')
       } else {
            const user = await User.findById(String(product.user))
        const review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: user._id
           }
           product.review.push(review)
           product.numReviews = product.review.length
           product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length
           await product.save()
           res.status(201).json({message: 'Review Added'})
        res.json({message: 'Vijay'})
       }
       
    } else {
        res.status(404)
        throw new Error('product not founc')
    }
})
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products);
    console.log(products)
})

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};