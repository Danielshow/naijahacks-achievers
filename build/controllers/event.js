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
var EventController = function () {
  function EventController() {
    _classCallCheck(this, EventController);
  }

  _createClass(EventController, [{
    key: 'createEvent',
    value: function createEvent(req, res, next) {
      var bd = req.body;
      var query = 'INSERT INTO event(title,location,startdate,enddate,starttime,endtime,category,image,description,\n      organizer,organizerdescription,userID) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)';
      var params = [bd.title.trim(), bd.location.trim(), bd.startdate.trim(), bd.enddate.trim(), bd.starttime.trim(), bd.endtime.trim(), bd.category.trim(), bd.image.trim(), bd.description.trim(), bd.organizer.trim(), bd.organizerdescription.trim(), req.decoded.userid];
      _index2.default.query(query, params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: {
            title: bd.title.trim(),
            location: bd.location.trim(),
            startdate: bd.startdate.trim(),
            enddate: bd.enddate.trim(),
            starttime: bd.starttime.trim(),
            endtime: bd.endtime.trim(),
            category: bd.category.trim(),
            image: bd.image.trim(),
            description: bd.description.trim(),
            organizer: bd.organizer.trim(),
            organizerdescription: bd.organizerdescription.trim(),
            userID: req.decoded.userid
          },
          message: 'Event created successfully'
        });
      });
    }
  }, {
    key: 'getAllEvent',
    value: function getAllEvent(req, res, next) {
      _index2.default.query('SELECT * from event', function (err, data) {
        if (err) {
          next(err);
        }
        if (data.rows.length < 1) {
          return res.status(200).json({
            TYPE: 'GET',
            status: 200,
            message: 'No Event created'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows,
          message: 'All Events returned successfully'
        });
      });
    }
  }, {
    key: 'getOneEvent',
    value: function getOneEvent(req, res, next) {
      _index2.default.query('SELECT * FROM event WHERE id=$1', [req.params.id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows.length < 1) {
          return res.status(404).json({
            TYPE: 'GET',
            status: 404,
            message: 'Event not found'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows[0],
          message: 'Event returned successfully'
        });
      });
    }
  }, {
    key: 'updateEvent',
    value: function updateEvent(req, res, next) {
      var bd = req.body;
      var query = 'Update event SET title=$1,location=$2,startdate=$3,enddate=$4,starttime=$5,endtime=$6,category=$7,image=$8,description=$9,organizer=$10,organizerdescription=$11,userID=$12';
      var params = [bd.title.trim(), bd.location.trim(), bd.startdate.trim(), bd.enddate.trim(), bd.starttime.trim(), bd.endtime.trim(), bd.category.trim(), bd.image.trim(), bd.description.trim(), bd.organizer.trim(), bd.organizerdescription.trim(), req.decoded.userid];
      _index2.default.query(query, params, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'POST',
          status: 200,
          data: {
            title: bd.title.trim(),
            location: bd.location.trim(),
            startdate: bd.startdate.trim(),
            enddate: bd.enddate.trim(),
            starttime: bd.starttime.trim(),
            endtime: bd.endtime.trim(),
            category: bd.category.trim(),
            image: bd.image.trim(),
            description: bd.description.trim(),
            organizer: bd.organizer.trim(),
            organizerdescription: bd.organizerdescription.trim(),
            userID: req.decoded.userid
          },
          message: 'Event updated successfully'
        });
      });
    }
  }, {
    key: 'getAllEventUser',
    value: function getAllEventUser(req, res, next) {
      _index2.default.query('SELECT * from event where userid=$1', [req.params.id], function (err, data) {
        if (err) {
          return next(err);
        }
        if (data.rows[0] < 1) {
          return res.status(404).json({
            TYPE: 'GET',
            status: 404,
            message: 'User event not found'
          });
        }
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          data: data.rows,
          message: 'User Event returned successfully'
        });
      });
    }
  }, {
    key: 'deleteEvent',
    value: function deleteEvent(req, res, next) {
      _index2.default.query('DELETE from event where id=$1', [req.params.id], function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          TYPE: 'DELETE',
          status: 200,
          message: 'Event deleted successfully'
        });
      });
    }
  }]);

  return EventController;
}();

var eventController = new EventController();
exports.default = eventController;