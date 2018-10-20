import db from './index';

db.query(`CREATE TABLE users(
id serial PRIMARY KEY,
firstname text NOT NULL,
lastname text NOT NULL,
email text NOT NULL,
phonenumber text NOT NULL,
username text UNIQUE,
password text NOT NULL,
address text
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
