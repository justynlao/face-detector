// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

// controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// salt to add to password hashing
const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

// signin endpoint; compare login information with database
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// register endpoint; add a new user to the database with a hashed password
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds) })

// profile endpoint; display a user's information
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// image endpoint; increment a given user's entries count by 1
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// imageurl endpoint; get imageurl state from front-end to call API
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
