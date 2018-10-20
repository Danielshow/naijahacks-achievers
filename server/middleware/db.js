import db from '../db/index';

module.export = {
  isEmailExist: (req, res, next) => {
    db.query('SELECT email from users where email=$1', [req.body.email.toLowerCase()], (err, data) => {
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
    db.query('SELECT * from users where email = $1', [req.body.email.toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length < 1) {
        return next();
      }
      return res.status(403).json({
        status: 403,
        message: 'Incorrect email or password',
      });
    });
  },
};
