import bcrypt from 'bcryptjs';
import db from './index';

const password = bcrypt.hashSync('adminone', 10);
const params = ['admin', 'admin@foodfast.com', password, 'Admin', 'One', 'default', 'Default address', 'admin'];
db.query('INSERT INTO users(username, email, password, firstname, lastname, phonenumber, address, roles) VALUES($1,$2,$3,$4,$5)', params, (err) => {
  if (err) {
    console.log(err);
  }
});
