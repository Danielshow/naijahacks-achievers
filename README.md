[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Event-Rock

Web application for creating Events

### NaijaHacks Hackonton 2018
### Team Achievers
### Team Members
- Shotonwa Daniel danielshotonwa53@gmail.com
- Adewole Samuel samueladewole15@gmail.com
- Olorunsola Babatunde 

### Section
- FinTech

### Problem
Nigeria have the problem of pasting posters all over the wall in every surroundings which most times litter the environments. This gives cleaners more work to do. Curbing this will give rise to cleanliness. 

Event creators dont have lot of audience to pitch their ideas or event to and some creators of events use large sum of money to find audience.

### Proposed Solution
A Web Application for posting events and registering free of charge. User can post events and see a list of people who registered for that event, making it easy to get back to people. User must signin to create event and also unregistered user can view and also register for events.

### Proposed Stack
- Node js
- Express
- Html & css
- Bootstrap
- Javascript

## Prerequisites
1. [Node js](https://nodejs.org/en/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)
4. Postgresql

## Installing

Clone this project using `git clone https://github.com/Danielshow/naijahacks-achievers/` on your bash or cmd

```shell
mkdir event-rock
cd event-rock
git clone https://github.com/Danielshow/naijahacks-achievers/
cd "naijahacks-achievers"
npm Install
git checkout develop
npm start
```
Hurray!!! You now have the files on your local computer
`npm install` will install all app dependencies
`npm start` will start the project

make your environment variable `.env file`
Fill in this data for postgresql and Json web token to work
```
PORT=3000
PGHOST=localhost
PGPASSWORD=
PGDATABASE=eventrock
PGUSER=
PGPORT=7432
JWT_KEY=
```

## API Routes

| HTTP verb | Routes  | Description |
|-----------| ------------- | ------------- |
| POST | /api/v1/auth/signup | Register a user |
| POST | /api/v1/auth/login | Login a user |
| GET | /api/v1/auth/me | Get a specific user by user token |
| GET | /api/v1/auth/logout | Logout a user |
| GET | /api/v1/users | Get all registered user |
| DELETE | /api/v1/users | Delete user account by user token |
| DELETE | /api/v1/users/:id | Delete user by ID |
| PUT | /api/v1/users/:id | Promote user to admin |
| POST | /api/v1/event | Create an event |
| GET | /api/v1/event | Get all event |
| GET | /api/v1/event/:id | Get one event by ID |
| PUT | /api/v1/event/:id | Update Event by ID |
| GET | /api/v1/event/:id/user | get all event for a particular user |
| DELETE | /api/v1/event/:id | Delete event by ID |
| DELETE | /api/v1/event/admin/:id | Delete event by Admin |
| POST | /api/v1/category | Get event by category |
| POST | /api/v1/event/register/:id | Register for a particular event |
| GET | /api/v1/event/user/:id | GET all users that register to an event |

## Contributing

If you'd like to Contribute, please fork the repository and create a new branch, commit to that branch and make a pull request

## Links

1. [Front End Homepage](https://danielshow.github.io/naijahacks-achievers/)
2. [API on Heroku](http://teamachievers.herokuapp.com/api/v1)

## Author

1. [Danielshow](https://github.com/danielshow)
2. [Samuel Adewole](https://github.com/sadewole)

## Acknowledgement

1. Naija hacks



