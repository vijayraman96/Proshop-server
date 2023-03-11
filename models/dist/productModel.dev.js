"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reviewSchema = _mongoose["default"].Schema({
  name: {
    type: String
  },
  rating: {
    type: Number
  },
  comment: {
    type: String
  },
  user: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

var productSchema = _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  review: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    "default": 0
  },
  numReviews: {
    type: Number,
    required: true,
    "default": 0
  },
  price: {
    type: Number,
    required: true,
    "default": 0
  },
  countInStock: {
    type: Number,
    required: true,
    "default": 0
  }
}, {
  timestamps: true
});

var Product = _mongoose["default"].model('Product', productSchema);

console.log('review Schema', Product);
var _default = Product;
exports["default"] = _default;