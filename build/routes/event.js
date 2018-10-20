'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _event = require('../middleware/event');

var _event2 = _interopRequireDefault(_event);

var _event3 = require('../controllers/event');

var _event4 = _interopRequireDefault(_event3);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _db = require('../middleware/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/event', _auth2.default.verifyToken, [_event2.default.verifyBody, _event2.default.verifyDate, _event2.default.verifyTime, _event2.default.isValidCategory], _event4.default.createEvent);
router.get('/event', _event4.default.getAllEvent);
router.get('/event/:id', _auth2.default.isValidID, _event4.default.getOneEvent);
router.put('/event/:id', _auth2.default.verifyToken, [_auth2.default.isValidID, _db2.default.isUserResource, _event2.default.verifyBody, _event2.default.verifyDate, _event2.default.verifyTime, _event2.default.isValidCategory], _event4.default.updateEvent);
router.get('/event/:id/user', _auth2.default.verifyToken, [_auth2.default.isValidID, _db2.default.isUserEvent], _event4.default.getAllEventUser);
router.delete('/event/:id', _auth2.default.verifyToken, [_auth2.default.isValidID, _db2.default.isUserResource], _event4.default.deleteEvent);
router.delete('/event/admin/:id', _auth2.default.verifyAdminToken, _auth2.default.isValidID, _event4.default.deleteEvent);

exports.default = router;