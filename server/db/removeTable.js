import db from './index';

db.query('DROP TABLe IF EXISTS users CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TYPE IF EXISTS roles CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
  db.query('CREATE TYPE roles AS ENUM (\'user\', \'admin\')', ((error) => {
    if (err) {
      console.log(error);
    }
  }));
});

db.query('DROP TYPE IF EXISTS category CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
  db.query(`CREATE TYPE category as ENUM('music', 'sport', 'art', 'business',
'conference', 'party', 'festival', 'science and technology')`, (error) => {
    if (error) {
      console.log(err);
    }
  });
});
