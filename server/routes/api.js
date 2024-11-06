const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const ensureAuthenticated = require('../middleware/auth');

const connection = mysql.createConnection({
    host: process.env.sqlHost,
    user: process.env.sqlUsername,
    password: process.env.sqlPassword,
    database: process.env.sqlDB,
});

connection.connect((err) => {
    if (err) throw err;
    console.log("[CONNECTION]: API connected to MySQL database");
});

router.post('/donate', (req, res) =>{
    const {
        OrganizationID,
        DonatorName,
        DonationAmount,
        Verified,
        DonationProof
    } = req.body;

    connection.query('INSERT INTO donationTable (OrganizationID, DonatorName, DonationAmount, Verified, DonationProof) VALUES (?, ?, ?, ?, ?)', [OrganizationID, DonatorName == "" ? "Anonymous" : DonatorName, DonationAmount, false, DonationProof], (err, result) => {
        if (err) {
            console.error('Error inserting donation:', err);
            return res.status(500).json({ message: 'Error adding donation' });
        }

        res.status(200).json({
            message: 'Donation added successfully',
            donationID: result.insertId
        });
    });
});

router.post('/verifydonation', ensureAuthenticated, (req, res) => {
    const { DonationID } = req.body;

    connection.query('UPDATE donationTable SET Verified = true WHERE DonationID = ?', [DonationID], (err, result) => {
        if (err) {
            console.error('Error verifying donation:', err);
            return res.status(500).json({ message: 'Error verifying donation' });
        }

        res.status(200).json({
            message: 'Donation verified successfully',
            donationID: DonationID
        });
    });
});

router.get('/getorganizations', ensureAuthenticated, (req, res) => {
    connection.query('SELECT * FROM organizationData', (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Route to add a new organization
router.post('/addorganization', ensureAuthenticated, (req, res) => {
    const {
        organizationName,
        organizationDescription,
        organizationPhoneNumber,
        organizationAddress,
        organizationAbbreviation,
        representativeName,
        representativeContactNumber,
    } = req.body;

    // SQL query to insert new organization data into the database
    const query = `
        INSERT INTO organizationData (
            organizationName, 
            organizationDescription, 
            organizationPhoneNumber, 
            organizationAddress, 
            organizationAbbreviation, 
            representativeName, 
            representativeContactNumber
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        organizationName,
        organizationDescription,
        organizationPhoneNumber,
        organizationAddress,
        organizationAbbreviation,
        representativeName,
        representativeContactNumber
    ];

    // Execute the SQL query
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting organization:', err);
            return res.status(500).json({ message: 'Error adding organization' });
        }

        res.status(200).json({
            message: 'Organization added successfully',
            organizationID: result.insertId
        });
    });
});


module.exports = router;