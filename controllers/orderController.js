import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxprice,
    totalPrice,
    
  } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Ordern items')
    return
  } else {
    const order = new Order ({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxprice,
        totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if(order) {
    res.json(order)
  } else {
    throw new Error('Order Not found')
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    const updateData = {
      isPaid : true,
      paidAt: Date.now(),
      paymentResult : {
        id: req.body.id,
        status: String(req.body.status),
        update_time: String(req.body.update_time),
        email_address: req.body.email_address

      }
      
    }
    const updatedOrder = await Order.updateOne({_id: req.params.id}, {$set: updateData} )
    const orderUpdate  = await Order.findById(req.params.id)
    res.json(orderUpdate)
});
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
    res.json(orders)
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
    
   
});

export {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders}