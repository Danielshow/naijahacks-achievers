'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _usersort = require('../controllers/usersort');

var _usersort2 = _interopRequireDefault(_usersort);

var _event = require('../middleware/event');

var _event2 = _interopRequireDefault(_event);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _db = require('../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/category', _event2.default.isValidCategory, _usersort2.default.sortByCategory);
router.post('/event/register/:id', [_auth2.default.isValidID, _event2.default.verifyEventRegister, _db2.default.isEmailInRegister, _auth2.default.testEmailFormat], _usersort2.default.registerForEvent);
router.get('/event/users/:id', _auth2.default.verifyToken, [_auth2.default.isValidID, _db2.default.isUserResource], _usersort2.default.getUserForEvent);
exports.default = router;