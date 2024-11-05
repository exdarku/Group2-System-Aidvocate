const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const hostname = 'localhost';
const port = 3000;

const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
