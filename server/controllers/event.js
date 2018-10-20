import db from '../db/index';
/* eslint-disable class-methods-use-this */
class EventController {
  createEvent(req, res, next) {
    const bd = req.body;
    const query = `INSERT INTO event(
      title,location,startdate,enddate,starttime,endtime,category,image,description,
      organizer,organizerdescription,userID) VALUES($1,$2,$3,$4,$5,$6
      $7,$8,$9,$10,$11,$12)`;
    const params = `[${bd.title.trim()}, ${bd.location.trim()}, ${bd.startdate.trim()}, ${bd.enddate.trim()},
      ${bd.starttime.trim()}, ${bd.endtime.trim()}, ${bd.category.trim()}, ${bd.image.trim()}, ${bd.description.trim()},
      ${bd.organizer.trim()}, ${bd.organizerdescription.trim()}, ${req.decoded.userid}]`;
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
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data,
        message: 'All Events returned successfully',
      });
    });
  }
}

const eventController = new EventController();
export default eventController;
