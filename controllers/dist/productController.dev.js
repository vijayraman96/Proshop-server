"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopProducts = exports.createProductReview = exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _productModel = _interopRequireDefault(require("../models/productModel.js"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getProducts = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var url, keyword, page, searchBarUrl, pageUrl, adminPageUrl, pageSize, count, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('req.query.keyword', req.query.url);
          url = req.query.url;
          console.log(url);

          if (url) {
            if (url.includes('/search')) {
              searchBarUrl = url.match('/search');
              keyword = {
                name: {
                  $regex: searchBarUrl.input.slice(8),
                  $options: 'i'
                }
              };
            } else if (url.includes('/page')) {
              pageUrl = url.match('/page');
              page = Number(pageUrl && pageUrl.input.slice(6)) || 1;
              keyword = {};
            } else if (url.includes('/admin/productlist')) {
              adminPageUrl = url.match('/admin/productlist');
              console.log(adminPageUrl, 'adminPageUrl', adminPageUrl.input.slice(19));
              page = Number(adminPageUrl && adminPageUrl.input.slice(19)) || 1;
              keyword = {};
            } else {
              page = 1;
              keyword = {};
            }
          }

          console.log(keyword, 'page', page);
          pageSize = 2;
          _context.next = 8;
          return regeneratorRuntime.awrap(_productModel["default"].countDocuments(_objectSpread({}, keyword)));

        case 8:
          count = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(_productModel["default"].find(_objectSpread({}, keyword)).limit(pageSize).skip(pageSize * (page - 1)));

        case 11:
          products = _context.sent;
          console.log(products);
          res.json({
            products: products,
            page: page,
            pages: Math.ceil(count / pageSize)
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getProducts = getProducts;
var getProductById = (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var id, product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id.trim();
          _context2.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].findById(id));

        case 3:
          product = _context2.sent;

          if (product) {
            res.json(product);
          } else {
            res.status(404).json({
              message: 'Product not found'
            });
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getProductById = getProductById;
var deleteProduct = (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var id, product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id.trim();
          console.log('id', id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(_productModel["default"].findById(id));

        case 4:
          product = _context3.sent;

          if (!product) {
            _context3.next = 11;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(product.remove());

        case 8:
          res.json({
            message: 'Product removed'
          });
          _context3.next = 13;
          break;

        case 11:
          res.status(404);
          throw new Error('Product not found');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.deleteProduct = deleteProduct;
var createProduct = (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
  var _req$body, user, name, image, brand, category, description, review, rating, numReviews, price, countInStock, product, createdProduct;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, user = _req$body.user, name = _req$body.name, image = _req$body.image, brand = _req$body.brand, category = _req$body.category, description = _req$body.description, review = _req$body.review, rating = _req$body.rating, numReviews = _req$body.numReviews, price = _req$body.price, countInStock = _req$body.countInStock;
          product = new _productModel["default"]({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description'
          });
          _context4.next = 4;
          return regeneratorRuntime.awrap(product.save());

        case 4:
          createdProduct = _context4.sent;

          if (!createdProduct) {
            _context4.next = 9;
            break;
          }

          res.status(201).json(createdProduct);
          _context4.next = 11;
          break;

        case 9:
          res.status(400);
          throw new Error('User registartion failed');

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.createProduct = createProduct;
var updateProduct = (0, _expressAsyncHandler["default"])(function _callee5(req, res) {
  var _req$body2, user, name, image, brand, category, description, review, rating, numReviews, price, countInStock, product, updatedProduct;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, user = _req$body2.user, name = _req$body2.name, image = _req$body2.image, brand = _req$body2.brand, category = _req$body2.category, description = _req$body2.description, review = _req$body2.review, rating = _req$body2.rating, numReviews = _req$body2.numReviews, price = _req$body2.price, countInStock = _req$body2.countInStock;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].findById(req.params.id));

        case 3:
          product = _context5.sent;

          if (!product) {
            _context5.next = 12;
            break;
          }

          product.name = name, product.price = price, product.description = description, product.image = image, product.brand = brand, product.category = category, product.countInStock = countInStock;
          _context5.next = 8;
          return regeneratorRuntime.awrap(product.save());

        case 8:
          updatedProduct = _context5.sent;
          res.json(updatedProduct);
          _context5.next = 14;
          break;

        case 12:
          res.status(404);
          throw new Error('product not founc');

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.updateProduct = updateProduct;
var createProductReview = (0, _expressAsyncHandler["default"])(function _callee6(req, res) {
  var _req$body3, rating, comment, product, alreadyReviewed, user, review;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, rating = _req$body3.rating, comment = _req$body3.comment;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_productModel["default"].findById(req.params.id));

        case 3:
          product = _context6.sent;
          console.log(product);

          if (!product) {
            _context6.next = 25;
            break;
          }

          alreadyReviewed = product.review;

          if (!(alreadyReviewed.length != 0)) {
            _context6.next = 12;
            break;
          }

          res.status(400);
          throw new Error('product already reviewed');

        case 12:
          _context6.next = 14;
          return regeneratorRuntime.awrap(_userModel["default"].findById(String(product.user)));

        case 14:
          user = _context6.sent;
          review = {
            name: user.name,
            rating: Number(rating),
            comment: comment,
            user: user._id
          };
          product.review.push(review);
          product.numReviews = product.review.length;
          product.rating = product.review.reduce(function (acc, item) {
            return item.rating + acc;
          }, 0) / product.review.length;
          _context6.next = 21;
          return regeneratorRuntime.awrap(product.save());

        case 21:
          res.status(201).json({
            message: 'Review Added'
          });
          res.json({
            message: 'Vijay'
          });

        case 23:
          _context6.next = 27;
          break;

        case 25:
          res.status(404);
          throw new Error('product not founc');

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.createProductReview = createProductReview;
var getTopProducts = (0, _expressAsyncHandler["default"])(function _callee7(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_productModel["default"].find({}).sort({
            rating: -1
          }).limit(3));

        case 2:
          products = _context7.sent;
          res.json(products);
          console.log(products);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.getTopProducts = getTopProducts;