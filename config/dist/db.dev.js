"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var connectDB = function connectDB() {
  var conn;
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            conn = _mongoose["default"].connect(process.env.MONGO_URI, {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });
            conn.then(function (resp) {
              console.log('database connected');
            });
          } catch (err) {
            console.log(err.message, 'blasted');
            process.exit(1);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = connectDB;
exports["default"] = _default;