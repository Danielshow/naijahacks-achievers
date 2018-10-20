import db from '../db/index';
/* eslint-disable class-methods-use-this */
class Authcontroller {
  registerUser(req, res, next) {
    // firstname lastname email phonenumber // username password confitm
    const bd = req.body;
    const params = [bd.firstname, bd.lastname, bd.email, bd.phonenumber, bd.username, bd.password];
    const query = 'INSERT INTO USERS(firstname, lastname, email, phonenumber, username, password) VALUES($1,$2,$3,$4,$5,$6)';
    db.query(query, params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        message: 'User registered Successfully',
      });
    });
  }
}
