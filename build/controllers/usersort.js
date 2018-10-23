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
var UserSort = function () {
  function UserSort() {
    _classCallCheck(this, UserSort);
  }

  _createClass(UserSort, [{
    key: 'sortByCategory',
    value: function sortByCategory(req, res, next) {
      _index2.default.query('SELECT * from event where category=$1 ORDER BY startdate', [req.body.category], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length < 1) {
          res.status(404).json({
            TYPE: 'POST',
            status: 404,
            message: 'Event in this category does not exist'
          });
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: data.rows,
          message: 'Event returned successfully'
        });
      });
    }
  }, {
    key: 'registerForEvent',
    value: function registerForEvent(req, res, next) {
      var bd = req.body;
      var params = [bd.name.trim(), bd.email.trim(), req.params.id];
      _index2.default.query('INSERT INTO eventusers(name, email, eventid) VALUES($1,$2,$3)', params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          message: 'User registered successfully'
        });
      });
    }
  }, {
    key: 'getUserForEvent',
    value: function getUserForEvent(req, res, next) {
      _index2.default.query('SELECT * FROM eventusers where eventid=$1', [req.params.id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length < 1) {
          return res.status(404).json({
            TYPE: 'GET',
            status: 404,
            message: 'No user have registered for this event'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows,
          message: 'User returned successfully'
        });
      });
    }
  }]);

  return UserSort;
}();

var usersort = new UserSort();
exports.default = usersort;