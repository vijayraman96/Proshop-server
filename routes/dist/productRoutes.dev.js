"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = require("../controllers/productController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').get(_productController.getProducts).post(_authMiddleware.protect, _authMiddleware.admin, _productController.createProduct);
router.route('/top').get(_productController.getTopProducts);
router.route('/:id/reviews').post(_authMiddleware.protect, _productController.createProductReview);
router.route('/:id').get(_productController.getProductById)["delete"](_authMiddleware.protect, _authMiddleware.admin, _productController.deleteProduct).put(_authMiddleware.protect, _authMiddleware.admin, _productController.updateProduct); // router.route('/top').get(getTopProducts);
// router.route('/create').post(createProduct)

var _default = router;
exports["default"] = _default;