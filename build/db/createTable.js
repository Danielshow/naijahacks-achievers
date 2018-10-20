'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('CREATE TABLE users(\nid serial PRIMARY KEY,\nfirstname text NOT NULL,\nlastname text NOT NULL,\nemail text NOT NULL UNIQUE,\nphonenumber text NOT NULL,\nusername text UNIQUE,\npassword text NOT NULL,\naddress text,\nroles roles NOT NULL\n)', function (err) {
  if (err) {
    console.log(err);
  }
});