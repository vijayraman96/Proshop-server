"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = exports.getMyOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _orderModel = _interopRequireDefault(require("../models/orderModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addOrderItems = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var _req$body, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxprice, totalPrice, order, createdOrder;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, orderItems = _req$body.orderItems, shippingAddress = _req$body.shippingAddress, paymentMethod = _req$body.paymentMethod, itemsPrice = _req$body.itemsPrice, shippingPrice = _req$body.shippingPrice, taxprice = _req$body.taxprice, totalPrice = _req$body.totalPrice;

          if (!(orderItems && orderItems.length === 0)) {
            _context.next = 7;
            break;
          }

          res.status(400);
          throw new Error('No Ordern items');

        case 7:
          order = new _orderModel["default"]({
            orderItems: orderItems,
            user: req.user._id,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxprice: taxprice,
            totalPrice: totalPrice
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(order.save());

        case 10:
          createdOrder = _context.sent;
          res.status(201).json(createdOrder);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addOrderItems = addOrderItems;
var getOrderById = (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id).populate('user', 'name email'));

        case 2:
          order = _context2.sent;

          if (!order) {
            _context2.next = 7;
            break;
          }

          res.json(order);
          _context2.next = 8;
          break;

        case 7:
          throw new Error('Order Not found');

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getOrderById = getOrderById;
var updateOrderToPaid = (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var order, updateData, updatedOrder, orderUpdate;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id));

        case 2:
          order = _context3.sent;
          updateData = {
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
              id: req.body.id,
              status: String(req.body.status),
              update_time: String(req.body.update_time),
              email_address: req.body.email_address
            }
          };
          _context3.next = 6;
          return regeneratorRuntime.awrap(_orderModel["default"].updateOne({
            _id: req.params.id
          }, {
            $set: updateData
          }));

        case 6:
          updatedOrder = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id));

        case 9:
          orderUpdate = _context3.sent;
          res.json(orderUpdate);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.updateOrderToPaid = updateOrderToPaid;
var getMyOrders = (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].find({
            user: req.user._id
          }));

        case 2:
          orders = _context4.sent;
          res.json(orders);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getMyOrders = getMyOrders;
var getOrders = (0, _expressAsyncHandler["default"])(function _callee5(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].find({}).populate('user', 'id name'));

        case 2:
          orders = _context5.sent;
          res.json(orders);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.getOrders = getOrders;
var updateOrderToDelivered = (0, _expressAsyncHandler["default"])(function _callee6(req, res) {
  var order, updatedOrder;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_orderModel["default"].findById(req.params.id));

        case 2:
          order = _context6.sent;

          if (!order) {
            _context6.next = 12;
            break;
          }

          order.isDelivered = true;
          order.deliveredAt = Date.now();
          _context6.next = 8;
          return regeneratorRuntime.awrap(order.save());

        case 8:
          updatedOrder = _context6.sent;
          res.json(updatedOrder);
          _context6.next = 14;
          break;

        case 12:
          res.status(404);
          throw new Error('Order Not Found');

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.updateOrderToDelivered = updateOrderToDelivered;