'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testEmail = function testEmail(email) {
  var re = /\S+@\S+.\S/;
  return re.test(email);
};

var testPassword = function testPassword(password) {
  var re = /\w+/;
  return re.test(password);
};
exports.default = {
  verifyToken: function verifyToken(req, res, next) {
    try {
      var token = req.headers.authorization.split(' ')[1];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      return next();
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          status: 401,
          message: 'Authentication fail, Incorrect Token'
        });
      }
      return res.status(403).json({
        status: 403,
        message: 'Authentication fail, Please provide Token'
      });
    }
  },
  verifyAdminToken: function verifyAdminToken(req, res, next) {
    try {
      var token = req.headers.authorization.split(' ')[1];
      var decoded = _jsonwebtoken2.default.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      _index2.default.query('SELECT * from users WHERE email=$1', [decoded.email], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          if (data.rows[0].roles === 'admin') {
            return next();
          }
          return res.status(403).json({
            status: 403,
            message: 'You are not authorize to do this'
          });
        }
      });
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          status: 401,
          message: 'Authentication fail, Incorrect Token'
        });
      }
      return res.status(403).json({
        status: 403,
        message: 'Authentication fail, Please provide Token'
      });
    }
  },
  verifyBodyRegister: function verifyBodyRegister(req, res, next) {
    if (!req.body.firstname || req.body.firstname.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'First name must not be empty'
      });
    }
    if (!req.body.lastname || req.body.lastname.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Last name must not be empty'
      });
    }
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must not be empty'
      });
    }
    if (!req.body.phonenumber || req.body.phonenumber.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'phonenumber must not be empty'
      });
    }
    if (!req.body.username || req.body.username.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Username must not be empty'
      });
    }
    if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Password cannot be empty'
      });
    }
    if (!req.body.confirmpassword || req.body.confirmpassword.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'confirmpassword must not be empty'
      });
    }
    if (req.body.phonenumber.length !== 11) {
      return res.status(400).json({
        status: 400,
        message: 'phonenumber length must be equal to 11'
      });
    }
    return next();
  },

  testEmailFormat: function testEmailFormat(req, res, next) {
    if (!testEmail(req.body.email)) {
      return res.status(404).json({
        status: 400,
        message: 'Invalid Email Format'
      });
    }
    return next();
  },

  testPasswordFormat: function testPasswordFormat(req, res, next) {
    if (!testPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'Password must contain numbers or Letter'
      });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({
        status: 400,
        message: 'Password length must be a minimum of 6 characters'
      });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and Confirmpassword not equal'
      });
    }
    return next();
  },
  verifySignin: function verifySignin(req, res, next) {
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must be included in the body'
      });
    }if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'password must be included in the body'
      });
    }
    return next();
  },
  isValidID: function isValidID(req, res, next) {
    if (isNaN(req.params.id) || Number(req.params.id) > 9000) {
      return res.status(403).json({
        status: 403,
        message: 'ID must be a number and less than 9000'
      });
    }
    return next();
  },
  verifyRoles: function verifyRoles(req, res, next) {
    if (!req.body.roles || req.body.roles.trim().length < 1) {
      return res.status(400).json({
        status: 400,
        message: 'roles must be included in the body'
      });
    }
    var roles = req.body.roles.toLowerCase();
    if (roles !== 'admin' && roles !== 'user') {
      return res.status(400).json({
        status: '400',
        message: 'Roles must be either Admin or Users'
      });
    }
    return next();
  }
};