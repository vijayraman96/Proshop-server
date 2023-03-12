"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _morgan = _interopRequireDefault(require("morgan"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));

var _uploadRoutes = _interopRequireDefault(require("./routes/uploadRoutes.js"));

var _errorMiddleware = require("./middleware/errorMiddleware.js");

var _checkModel = _interopRequireDefault(require("./models/checkModel.js"));

var _razorpay = _interopRequireDefault(require("razorpay"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _db["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json());

_dotenv["default"].config(); // if(process.env.NODE_ENV === "development") {
//     app.use(morgan('env'))
// } 
// app.get('/', (req, res) => {
//     res.send('Hello');
// })


app.post('/api/check/', function _callee(req, res) {
  var checkStatus;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          checkStatus = new _checkModel["default"](req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(checkStatus.save());

        case 4:
          res.send(checkStatus);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          res.status(500).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
app.get('/api/check/', function _callee2(req, res) {
  var checkStatus;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _checkModel["default"])({}));

        case 2:
          checkStatus = _context2.sent;

          try {
            res.send(checkStatus);
          } catch (err) {
            res.status(500).send(err);
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/api/pay/', function _callee3(req, res) {
  var instance, options;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // const value  = await req.body
          instance = new _razorpay["default"]({
            key_id: process.env.RAJORPAY_CLIENT_ID,
            key_secret: process.env.RAJORPAY_SECRET_KEY
          });
          options = {
            amount: req.body.totalPrice * 100,
            // amount == Rs 10
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 0 // 1 for automatic capture // 0 for manual capture

          };
          instance.orders.create(options, function (err, order) {
            return res.json(order);
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.use('/api/products/', _productRoutes["default"]);
app.use('/api/users/', _userRoutes["default"]);
app.use('/api/order', _orderRoutes["default"]);
app.use('/api/upload', _uploadRoutes["default"]);

var _dirname = _path["default"].resolve();

app.use('/uploads', _express["default"]["static"](_path["default"].join(_dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
  console.log('x');
} else {
  app.get('/', function (req, res) {
    res.send('...Api is running');
  });
}

app.use(_errorMiddleware.errorHandler);
app.use(_errorMiddleware.notFound);
var port = process.env.PORT;
app.listen(port, console.log("".concat(process.env.PORT, " ")));
var _default = app;
exports["default"] = _default;