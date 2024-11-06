const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ensureAuthenticated = require('./middleware/auth');
const path = require('path');
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
const apiRoutes = require('./routes/api');


app.use('/client', express.static(path.join(__dirname, 'public')));
app.use(express.static('client/public'));

// Middleware to protect the /admin directory
app.use('/admin', ensureAuthenticated, express.static(path.join(__dirname, 'client/admin')));

// Register your admin routes (after static middleware)
app.use('/admin', adminRoutes);

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/events/'));
});

app.get('/charities', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/charities/'));
})

app.listen(port, hostname, () => {
    console.log(`[SERVER]: Server running at http://${hostname}:${port}/`);
});
