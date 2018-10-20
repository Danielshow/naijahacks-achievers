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
    startDate date NOT NULL,
    EndDate date NOT NULL,
    category category NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    organizer text NOT NULL,
    organizerDescription text NOT NULL,
    userID integer References users(id) on DELETE CASCADE
  )`, (error) => {
    if (error) {
      console.log(error);
    }
  });
});

// event title, location, start and end date, start and end time, category = [music, sport,
// art, business, \
// conference, party, festival]
// science and technology, picture of event, description, organizer name
