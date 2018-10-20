import jwt from 'jsonwebtoken';
import db from '../db/index';

export default {
  isEmailExist: (req, res, next) => {
    db.query('SELECT email from users where email=$1', [req.body.email.trim().toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(409).send({
          status: 400,
          message: 'Email already exist',
        });
      }
      return next();
    });
  },
  isEmailInDb: (req, res, next) => {
    db.query('SELECT * from users where email = $1', [req.body.email.trim().toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return next();
      }
      return res.status(403).json({
        status: 403,
        message: 'Incorrect email or password',
      });
    });
  },
  isUsernameExist: (req, res, next) => {
    db.query('SELECT * FROM users where username=$1', [req.body.username.trim().toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length < 1) {
        return next();
      }
      return res.status(409).json({
        status: 409,
        messaage: 'Username already exist, Choose Another',
      });
    });
  },
  isUserResource: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      db.query('select * from event where id=$1', [req.params.id], (err, data) => {
        if (err) {
          return next(err);
        }
        if (data.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            message: 'Event not found',
          });
        }
        if (data.rows[0].userid === req.decoded.userid) {
          return next();
        }
        return res.status(403).send({
          status: 403,
          message: 'Auth Fail, You are not authorize to view this resource',
        });
      });
    } catch (err) {
      if (req.headers.authorization) {
        return res.status(401).json({
          status: 401,
          message: 'Authentication fail, Incorrect Token',
        });
      }
      return res.status(403).json({
        status: 403,
        message: 'Authentication fail, Please provide Token',
      });
    }
  },
};
