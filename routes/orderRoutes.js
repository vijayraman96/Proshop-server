import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, getOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myOrders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliever').put(protect, admin, updateOrderToDelivered)

export default router;