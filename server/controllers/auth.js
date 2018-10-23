import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/index';
/* eslint-disable class-methods-use-this */
class AuthController {
  registerUser(req, res, next) {
    // firstname lastname email phonenumber // username password confitm
    const bd = req.body;
    const password = bcrypt.hashSync(bd.password, 10);
    const params = [bd.firstname.trim().toLowerCase(), bd.lastname.trim().toLowerCase(), bd.email.trim().toLowerCase(), bd.phonenumber.trim().toLowerCase(), bd.username.trim().toLowerCase(), password, 'user'];
    const query = 'INSERT INTO USERS(firstname, lastname, email, phonenumber, username, password, roles) VALUES($1,$2,$3,$4,$5,$6,$7)';
    db.query(query, params, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        data: {
          username: bd.username.trim(),
          phonenumber: bd.phonenumber.trim(),
          email: req.body.email.trim(),
          firstname: bd.firstname.trim(),
          lastname: bd.lastname.trim(),
        },
        message: 'Registered Successfully',
      });
    });
  }

  login(req, res, next) {
    db.query('SELECT * from users WHERE email=$1', [req.body.email.trim().toLowerCase()], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        const compare = bcrypt.compareSync(req.body.password, data.rows[0].password);
        if (compare) {
          const token = jwt.sign({
            email: data.rows[0].email,
            userid: data.rows[0].id,
          }, process.env.JWT_KEY, {
            expiresIn: 86400,
          });
          return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            data: {
              token,
              roles: data.rows[0].roles,
            },
            message: 'Login Successful',
          });
        }
        return res.status(403).json({
          TYPE: 'POST',
          status: 403,
          message: 'Incorrect email or password',
        });
      }
    });
  }

  logout(req, res, next) {
    res.status(200).json({
      type: 'GET',
      status: 200,
      data: {
        token: null,
      },
      message: 'User logged out Successfully',
    });
  }

  getMe(req, res, next) {
    db.query('SELECT * from users where id=$1', [req.decoded.userid], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rows.length > 0) {
        return res.status(200).send({
          type: 'GET',
          status: 200,
          data: data.rows,
          message: 'User returned Successfully',
        });
      }
      return res.status(404).json({
        status: 400,
        message: 'User not found',
      });
    });
  }
}


const authcontroller = new AuthController();
export default authcontroller;
