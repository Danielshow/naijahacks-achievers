'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  filename: function filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-'));
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};
var upload = (0, _multer2.default)({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
});

exports.default = upload;