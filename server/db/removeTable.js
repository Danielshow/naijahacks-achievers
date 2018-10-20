import db from './index';

db.query('DROP TABLe IF EXISTS users', (err) => {
  if (err) {
    console.log(err);
  }
})
