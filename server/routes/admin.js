const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth'); // Import the auth middleware
const path = require('path');

// Serve static files from "client/public" publicly (no authentication needed)
router.use('/public', express.static(path.join(__dirname, '../../client/public')));

// Serve static files from "client/admin" only if authenticated
router.use('/', ensureAuthenticated, express.static(path.join(__dirname, '../../client/admin')));

router.get('/addorganization', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/admin/organization/register/index.html'));
});

// Protected admin route
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Serve the dashboard page only if authenticated
    res.sendFile(path.join(__dirname, "../../client/admin/dashboard/dashboard.html"));
});

// Protected settings route
router.get('/settings', ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Admin settings area.', user: req.user });
});


module.exports = router;
