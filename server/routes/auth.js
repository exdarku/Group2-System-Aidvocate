const express = require('express');
const ensureAuthenticated = require('../middleware/auth');
const router = express.Router();
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.sqlHost,
    user: process.env.sqlUsername,
    password: process.env.sqlPassword,
    database: process.env.sqlDB,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("[CONNECTION]: Auth connected to MySQL database");
});

// Configure Passport's Local Strategy
passport.use(new LocalStrategy(
        (username, password, done) => {
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return done(err);
            if (results.length === 0) return done(null, false, { message: 'Incorrect username.' });

            const user = results[0];
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
    }
));

// Serialize user - determines what to store in session
passport.serializeUser((user, done) => {
    done(null, user.username); // or user.user_id, based on your database structure
});

// Deserialize user - retrieves user object based on session data
passport.deserializeUser((user, done) => {
    connection.query('SELECT * FROM users WHERE username = ?', [user], (err, results) => {
        if (err) {
            return done(err);
        }
        done(null, results[0]); // Pass the full user object to the session
    });
});


// Register route
router.post('/register', (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;

    // First, check if there are any existing users in the database
    connection.query('SELECT COUNT(*) AS count FROM users', (err, results) => {
        if (err) {
            console.error('Error checking users in database:', err);
            return res.status(500).json({ message: 'Error checking users in database' });
        }

        const userCount = results[0].count;

        // If no users exist, allow registration without authentication check
        if (userCount === 0) {
            // No existing users, proceed with registration
            return registerUser();
        }

        // If users already exist, ensure that the request is authenticated
        ensureAuthenticated(req, res, () => {
            registerUser();  // Proceed with registration if authenticated
        });
    });

    // Function to register the user
    async function registerUser() {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            connection.query(
                'INSERT INTO users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)',
                [firstName, lastName, username, hashedPassword],
                (err, results) => {
                    if (err) {
                        console.error('Error registering user:', err);
                        return res.status(500).json({ message: 'Error registering user' });
                    }
                    res.status(201).json({ message: 'User registered successfully' });
                }
            );
        } catch (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Error processing registration' });
        }
    }
});


// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // Handle any error that occurred during authentication
        if (err) {
            return res.status(500).json({ message: 'Internal server error.' });
        }

        // If authentication failed (user not found or incorrect password)
        if (!user) {
            return res.status(401).json({ message: info.message || 'Authentication failed.' });
        }

        // Log in the user, which will establish the session
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login error.' });
            }
            // Successful login, return user data and redirect URL as JSON response
            return res.status(200).json({ message: 'Login successful!', redirectUrl: '/admin/dashboard', user: user });
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout error.' });
        }
        res.redirect('/login');
    });
});



module.exports = router;
