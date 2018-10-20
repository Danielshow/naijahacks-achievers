'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: 'registerUser',
    value: function registerUser(req, res, next) {
      // firstname lastname email phonenumber // username password confitm
      var bd = req.body;
      var password = _bcryptjs2.default.hashSync(bd.password, 10);
      var params = [bd.firstname.trim().toLowerCase(), bd.lastname.trim().toLowerCase(), bd.email.trim().toLowerCase(), bd.phonenumber.trim().toLowerCase(), bd.username.trim().toLowerCase(), password, 'user'];
      var query = 'INSERT INTO USERS(firstname, lastname, email, phonenumber, username, password, roles) VALUES($1,$2,$3,$4,$5,$6,$7)';
      _index2.default.query(query, params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: {
            username: bd.username.trim(),
            phonenumber: bd.phonenumber.trim(),
            email: req.body.email.trim(),
            firstname: bd.firstname.trim(),
            lastname: bd.lastname.trim()
          },
          message: 'Registered Successfully'
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res, next) {
      _index2.default.query('SELECT * from users WHERE email=$1', [req.body.email.trim().toLowerCase()], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          var compare = _bcryptjs2.default.compareSync(req.body.password, data.rows[0].password);
          if (compare) {
            var token = _jsonwebtoken2.default.sign({
              email: data.rows[0].email,
              userid: data.rows[0].id
            }, process.env.JWT_KEY, {
              expiresIn: 86400
            });
            return res.status(200).json({
              TYPE: 'POST',
              status: 200,
              data: {
                token: token,
                data: data.rows[0].roles
              },
              message: 'Login Successful'
            });
          }
          return res.status(403).json({
            TYPE: 'POST',
            status: 403,
            message: 'Incorrect email or password'
          });
        }
      });
    }
  }, {
    key: 'logout',
    value: function logout(req, res, next) {
      res.status(200).json({
        type: 'GET',
        status: 200,
        data: {
          token: null
        },
        message: 'User logged out Successfully'
      });
    }
  }, {
    key: 'getMe',
    value: function getMe(req, res, next) {
      _index2.default.query('SELECT * from users where id=$1', [req.decoded.userid], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length > 0) {
          return res.status(200).send({
            type: 'GET',
            status: 200,
            data: data.rows,
            message: 'User returned Successfully'
          });
        }
        return res.status(404).json({
          status: 400,
          message: 'User not found'
        });
      });
    }
  }]);

  return AuthController;
}();

var authcontroller = new AuthController();
exports.default = authcontroller;