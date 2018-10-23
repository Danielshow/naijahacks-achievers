'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: 'getAllUsers',
    value: function getAllUsers(req, res, next) {
      _index2.default.query('select * from users', function (err, data) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          type: 'GET',
          status: 200,
          data: data.rows,
          message: 'All users returned successfully'
        });
      });
    }
  }, {
    key: 'deleteAccount',
    value: function deleteAccount(req, res, next) {
      _index2.default.query('Delete from users where id=$1', [req.decoded.userid], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          type: 'DELETE',
          status: 200,
          message: 'Account successfully deleted'
        });
      });
    }
  }, {
    key: 'deleteUsers',
    value: function deleteUsers(req, res, next) {
      _index2.default.query('DELETE from users where id=$1', [req.params.id], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          type: 'DELETE',
          status: 200,
          message: 'User Deleted successfully'
        });
      });
    }
  }, {
    key: 'promoteUsers',
    value: function promoteUsers(req, res, next) {
      _index2.default.query('Update users SET roles=$1 where id=$2', [req.body.roles.toLowerCase(), req.params.id], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          type: 'PUT',
          status: 200,
          message: 'User promoted to admin successfully'
        });
      });
    }
  }]);

  return UsersController;
}();

var usersController = new UsersController();
exports.default = usersController;