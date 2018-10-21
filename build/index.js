'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _event = require('./routes/event');

var _event2 = _interopRequireDefault(_event);

var _usersort = require('./routes/usersort');

var _usersort2 = _interopRequireDefault(_usersort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
// bodyparser middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_express2.default.static('UI'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message
  });
});
// routes needed
app.use('/api/v1', _auth2.default);
app.use('/api/v1', _users2.default);
app.use('/api/v1', _event2.default);
app.use('/api/v1', _usersort2.default);

app.get('/api/v1', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to EventRock API'
  });
});

app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handling
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.send({
    error: error.message
  });
});

app.listen(process.env.PORT, function () {
  console.log('App listening on Port ' + process.env.PORT);
});

exports.default = app;