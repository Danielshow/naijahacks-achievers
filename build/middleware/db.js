'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  isEmailExist: function isEmailExist(req, res, next) {
    _index2.default.query('SELECT email from users where email=$1', [req.body.email.trim().toLowerCase()], function (err, data) {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(409).send({
          status: 400,
          message: 'Email already exist'
        });
      }
      return next();
    });
  },
  isEmailInDb: function isEmailInDb(req, res, next) {
    _index2.default.query('SELECT * from users where email = $1', [req.body.email.trim().toLowerCase()], function (err, data) {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return next();
      }
      return res.status(403).json({
        status: 403,
        message: 'Incorrect email or password'
      });
    });
  },
  isUsernameExist: function isUsernameExist(req, res, next) {
    _index2.default.query('SELECT * FROM users where username=$1', [req.body.username.trim().toLowerCase()], function (err, data) {
      if (err) {
        return next(err);
      }
      if (data.rows.length < 1) {
        return next();
      }
      return res.status(409).json({
        status: 409,
        messaage: 'Username already exist, Choose Another'
      });
    });
  }
};