"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = require("../controllers/orderController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').post(_authMiddleware.protect, _orderController.addOrderItems).get(_authMiddleware.protect, _authMiddleware.admin, _orderController.getOrders);
router.route('/myOrders').get(_authMiddleware.protect, _orderController.getMyOrders);
router.route('/:id').get(_authMiddleware.protect, _orderController.getOrderById);
router.route('/:id/pay').put(_authMiddleware.protect, _orderController.updateOrderToPaid);
router.route('/:id/deliever').put(_authMiddleware.protect, _authMiddleware.admin, _orderController.updateOrderToDelivered);
var _default = router;
exports["default"] = _default;