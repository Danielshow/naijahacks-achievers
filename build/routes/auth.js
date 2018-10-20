'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _auth3 = require('../middleware/auth');

var _auth4 = _interopRequireDefault(_auth3);

var _db = require('../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/auth/signup', [_auth4.default.verifyBodyRegister, _auth4.default.testEmailFormat, _auth4.default.testPasswordFormat, _db2.default.isEmailExist, _db2.default.isUsernameExist], _auth2.default.registerUser);
router.post('/auth/login', [_auth4.default.verifySignin, _db2.default.isEmailInDb], _auth2.default.login);
router.get('/auth/me', _auth4.default.verifyToken, _auth2.default.getMe);
router.get('/auth/logout', _auth4.default.verifyToken, _auth2.default.logout);
exports.default = router;