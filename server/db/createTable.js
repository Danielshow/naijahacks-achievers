import db from './index';

db.query(`CREATE TABLE users(
id serial PRIMARY KEY,
firstname text NOT NULL,
lastname text NOT NULL,
email text NOT NULL UNIQUE,
phonenumber text NOT NULL,
username text UNIQUE,
password text NOT NULL,
address text,
roles roles NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
