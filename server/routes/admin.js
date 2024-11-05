// server/routes/admin.js
const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); // Import the auth middleware
const path = require('path');

// Protected admin route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // If the user is authenticated, send the dashboard view or data
    res.sendFile(path.join(__dirname, "../../public/admin/dashboard/dashboard.html"));
    //res.status(200).json({ message: 'Welcome to the admin dashboard!', user: req.user });
});

// Other routes can also be protected using the same middleware
router.get('/settings', ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Admin settings area.', user: req.user });
});

module.exports = router;
