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
  db.query(`CREATE TABLE event(
    id serial PRIMARY KEY,
    title text NOT NULL,
    location text NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    starttime time without time zone NOT NULL,
    endtime time without time zone NOT NULL,
    category category NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    organizer text NOT NULL,
    organizerdescription text NOT NULL,
    userID integer References users(id) on DELETE CASCADE
  )`, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

db.query(`CREATE TABLE eventusers(
id serial PRIMARY KEY,
name text NOT NULL,
email text NOT NULL UNIQUE,
phonenumber text NOT NULL,
eventid Integer NOT NULL Reference event(id) on DELETE CASCADE
)`, (err) => {
  if (err) {
    console.log(err);
  }
});

// event title, location, start and end date, start and end time, category = [music, sport,
// art, business, \
// conference, party, festival]
// science and technology, picture of event, description, organizer name
