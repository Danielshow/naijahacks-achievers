import jwt from 'jsonwebtoken';

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
};
