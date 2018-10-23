'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('DROP TABLe IF EXISTS users CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
});

_index2.default.query('DROP TYPE IF EXISTS roles CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TYPE roles AS ENUM (\'user\', \'admin\')', function (error) {
    if (err) {
      console.log(error);
    }
  });
});

_index2.default.query('DROP TYPE IF EXISTS category CASCADE', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TYPE category as ENUM(\'music\', \'sport\', \'art\', \'business\',\n\'conference\', \'party\', \'festival\', \'science and technology\')', function (error) {
    if (error) {
      console.log(err);
    }
  });
});