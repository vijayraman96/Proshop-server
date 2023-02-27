import express from 'express';
import { getProductById, getProducts, updateProduct } from '../controllers/productController.js'
const router = express.Router();

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
router.route('/create').post(updateProduct)


export default router;