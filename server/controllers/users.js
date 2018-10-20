import db from '../db/index';
/* eslint-disable class-methods-use-this */
class UsersController {
  getAllUsers(req, res, next) {
    db.query('select * from users', (err, data) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        type: 'GET',
        status: 200,
        data: data.rows,
        message: 'All users returned successfully',
      });
    });
  }

  deleteAccount(req, res, next) {
    db.query('Delete from users where id=$1', [req.decoded.userid], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        type: 'DELETE',
        status: 200,
        message: 'Account successfully deleted',
      });
    });
  }

  deleteUsers(req, res, next) {
    db.query('DELETE from users where id=$1', [req.params.id], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        type: 'DELETE',
        status: 200,
        message: 'User Deleted successfully',
      });
    });
  }

  promoteUsers(req, res, next) {
    db.query('Update users SET roles=$1 where id=$2', [req.body.roles.toLowerCase(), req.params.id], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        type: 'PUT',
        status: 200,
        message: 'User promoted to admin successfully',
      })
    })
  }
}

const usersController = new UsersController();
export default usersController;
