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
    const asciiArt = `
  AAAAA   III   DDDD   V   V  OOO   CCCCC   AAAAA   TTTTT  EEEEE
 A     A   I    D   D  V   V O   O  C       A     A   T    E
 AAAAAAA   I    D   D  V   V O   O  C       AAAAAAA   T    EEEE
 A     A   I    D   D   V V  O   O  C       A     A   T    E
 A     A  III   DDDD     V    OOO   CCCCC   A     A   T    EEEEE
`;


    console.log(asciiArt);
    console.log("Welcome to Aidvocate!");
    console.log("Developed by:\n-> Laurence Kharl Devera\t| Front End Developer\n-> Laurence Lesmoras\t\t| Back End Developer\n-> Mc Curvin Royeras\t\t| UI/UX Designer\n-> Angela Nareen Bernales\t| UI/UX Designer\n-> Joshua Martin Famor\t\t| Researcher\n\n\t\t\t[CONSOLE]");
    console.log(`[SERVER]: Server running at http://${hostname}:${port}/`);
});
