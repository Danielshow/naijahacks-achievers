import db from '../db/index';

/* eslint-disable class-methods-use-this */
class UserSort {
  sortByCategory(req, res, next) {
    db.query('SELECT * from event where category=$1 ORDER BY startdate', [req.body.category], (err, data) => {
      if (err) {
        return next(err)
      }
      if (data.rows.length < 1) {
        res.status(404).json({
          TYPE: 'POST',
          status: 404,
          message: 'Event in this category does not exist',
        })
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        data: data.rows,
        message: 'Event returned successfully',
      })
    })
  }

  registerForEvent(req, res, next) {
    const params =[];
    db.query('INSERT INTO eventusers(name, email, phonenumber, eventid) VALUES($1,$2,$3,$4)', params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        message: 'User registered successfully',
      })
    })
  }

  getUserForEvent(req, res, next) {
    db.query('SELECT * FROM eventusers where eventid=$1', [req.params.id], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length < 1) {
        return res.status(404).json({
          TYPE: 'GET',
          status: 404,
          message: 'No user have registered for this event',
        })
      }
      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        data: data.rows,
        message: 'User returned successfully',
      })
    })
  }
}

const usersort = new UserSort();
export default usersort;
