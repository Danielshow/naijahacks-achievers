'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.query('CREATE TABLE users(\nid serial PRIMARY KEY,\nfirstname text NOT NULL,\nlastname text NOT NULL,\nemail text NOT NULL UNIQUE,\nphonenumber text NOT NULL,\nusername text UNIQUE,\npassword text NOT NULL,\naddress text,\nroles roles NOT NULL\n)', function (err) {
  if (err) {
    console.log(err);
  }
  _index2.default.query('CREATE TABLE event(\n    id serial PRIMARY KEY,\n    title text NOT NULL,\n    location text NOT NULL,\n    startdate date NOT NULL,\n    enddate date NOT NULL,\n    starttime time without time zone NOT NULL,\n    endtime time without time zone NOT NULL,\n    category category NOT NULL,\n    image text NOT NULL,\n    description text NOT NULL,\n    organizer text NOT NULL,\n    organizerdescription text NOT NULL,\n    userID integer References users(id) on DELETE CASCADE\n  )', function (error) {
    if (error) {
      console.log(error);
    }
  });
  _index2.default.query('CREATE TABLE eventusers(\n  id serial PRIMARY KEY,\n  name text NOT NULL,\n  email text NOT NULL UNIQUE,\n  eventid Integer NOT NULL References event(id) on DELETE CASCADE\n  )', function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// event title, location, start and end date, start and end time, category = [music, sport,
// art, business, \
// conference, party, festival]
// science and technology, picture of event, description, organizer name