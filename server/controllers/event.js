import db from '../db/index';
/* eslint-disable class-methods-use-this */
class EventController {
  createEvent(req, res, next) {
    const bd = req.body;
    const query = `INSERT INTO event(title,location,startdate,enddate,starttime,endtime,category,image,description,
      organizer,organizerdescription,userID) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;
    const params = [bd.title.trim(), bd.location.trim(), bd.startdate.trim(), bd.enddate.trim(), bd.starttime.trim(), bd.endtime.trim(), bd.category.trim(), bd.image.trim(), bd.description.trim(), bd.organizer.trim(), bd.organizerdescription.trim(), req.decoded.userid];
    db.query(query, params, (err) => {
      if (err) {
        next(err);
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
          userID: req.decoded.userid,
        },
        message: 'Event created successfully',
      });
    });
  }

  getAllEvent(req, res, next) {
    db.query('SELECT * from event', (err, data) => {
      if (err) {
        next(err);
      }
      if (data.rows.length < 1) {
        return res.status(200).json({
          TYPE: 'GET',
          status: 200,
          message: 'No Event created',
        });
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows,
        message: 'All Events returned successfully',
      });
    });
  }

  getOneEvent(req, res, next) {
    db.query('SELECT * FROM event WHERE id=$1', [req.params.id], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length < 1) {
        return res.status(404).json({
          TYPE: 'GET',
          status: 404,
          message: 'Event not found',
        });
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows[0],
        message: 'Event returned successfully',
      });
    });
  }

  updateEvent(req, res, next) {
    const bd = req.body;
    const query = `Update event SET title=$1,location=$2,startdate=$3,enddate=$4,starttime=$5,endtime=$6,category=$7,image=$8,description=$9,
        organizer=$10,organizerdescription=$11,userID=$12)`;
    const params = [bd.title.trim(), bd.location.trim(), bd.startdate.trim(), bd.enddate.trim(), bd.starttime.trim(), bd.endtime.trim(), bd.category.trim(), bd.image.trim(), bd.description.trim(), bd.organizer.trim(), bd.organizerdescription.trim(), req.decoded.userid];
    db.query(query, params, (err) => {
      if (err) {
        next(err);
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
          userID: req.decoded.userid,
        },
        message: 'Event updated successfully',
      });
    });
  }
}

const eventController = new EventController();
export default eventController;
