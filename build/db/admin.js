'use strict';

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var password = _bcryptjs2.default.hashSync('adminone', 10);
var params = ['admin', 'admin@eventrock.com', password, 'Admin', 'One', 'default', 'Default address', 'admin'];
_index2.default.query('INSERT INTO users(username, email, password, firstname, lastname, phonenumber, address, roles) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', params, function (err) {
  if (err) {
    console.log(err);
  }
});