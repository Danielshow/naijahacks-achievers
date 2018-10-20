import db from './index';

db.query('DROP TABLe IF EXISTS users', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TYPE IF EXISTS roles', (err) => {
  if (err) {
    console.log(err);
  }
  db.query('CREATE TYPE roles AS ENUM (\'user\', \'admin\')', ((error) => {
    if (err) {
      console.log(error);
    }
  }));
});
