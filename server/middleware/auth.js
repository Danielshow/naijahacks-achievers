import jwt from 'jsonwebtoken';

const testEmail = (email) => {
  const re = /\S+@\S+.\S/;
  return re.test(email);
};

const testPassword = (password) => {
  const re = /\w+/;
  return re.test(password);
};
module.export = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      return next();
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

  verifyBodyRegister: (req, res, next) => {
    if (!req.body.firstname || req.body.firstname.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'First name must not be empty',
      });
    }
    if (!req.body.lastname || req.body.lastname.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Last name must not be empty',
      });
    }
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email must not be empty',
      });
    }
    if (!req.body.phonenumber || req.body.phonenumber.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'phonenumber must not be empty',
      });
    }
    if (!req.body.username || req.body.username.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Username must not be empty',
      });
    }
    if (!req.body.password || req.body.password.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Password cannot be empty',
      });
    }

    if (!req.body.confirmpassword || req.body.confirmpassword.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'confirmpassword must not be empty',
      });
    }
    return next();
  },

  testEmailFormat: (req, res, next) => {
    if (!testEmail(req.body.email)) {
      return res.status(404).json({
        status: 400,
        message: 'Invalid Email Format',
      });
    }
    return next();
  },

  testPasswordFormat: (req, res, next) => {
    if (!testPassword(req.body.password)) {
      return res.status(400).json({
        status: 400,
        message: 'Password must contain numbers or Letter',
      });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({
        status: 400,
        message: 'Password length must be a minimum of 6 characters',
      });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and Confirmpassword not equal',
      });
    }
    return next();
  },
};
