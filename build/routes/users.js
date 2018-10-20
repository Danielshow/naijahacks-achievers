'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/users', _auth2.default.verifyAdminToken, _users2.default.getAllUsers);
router.delete('/users', _auth2.default.verifyToken, _users2.default.deleteAccount);
router.delete('/users/:id', _auth2.default.verifyAdminToken, _auth2.default.isValidID, _users2.default.deleteUsers);
router.put('/users/:id', _auth2.default.verifyAdminToken, _auth2.default.isValidID, _auth2.default.verifyRoles, _users2.default.promoteUsers);
exports.default = router;