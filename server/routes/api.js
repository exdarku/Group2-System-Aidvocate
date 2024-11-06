const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const ensureAuthenticated = require('../middleware/auth');

const connection = mysql.createConnection({
    host: process.env.sqlHost,
    user: process.env.sqlUsername,
    password: process.env.sqlPassword,
    database: process.env.sqlDB,
});

const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage: storage });

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

router.get('/getorganizations', (req, res) => {
    connection.query('SELECT * FROM organizationData', (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});



// Function to dynamically set the content type based on image extension or type
const getImageMimeType = (imageData) => {
    if (!imageData) return null;  // Return null if no image data is available
  
    const hexData = imageData.toString('hex', 0, 4); // Get first 4 bytes
    if (hexData.startsWith('ffd8')) {
      return 'image/jpeg';  // JPEG starts with 'ffd8'
    } else if (hexData.startsWith('89504e47')) {
      return 'image/png';  // PNG starts with '89504e47'
    } else if (hexData.startsWith('47494638')) {
      return 'image/gif';  // GIF starts with '47494638'
    }
    return 'image/jpeg';  // Default to JPEG if unknown
  };
  
  router.get('/image/:organizationId', (req, res) => {
    const organizationId = req.params.organizationId;
  
    connection.query('SELECT organizationFeaturePicture FROM organizationData WHERE organizationID = ?', [organizationId], (err, results) => {
      if (err) {
        console.error('Error retrieving image:', err);
        return res.status(500).send('Error retrieving image');
      }
  
      if (results.length > 0) {
        const imageData = results[0].organizationFeaturePicture;
  
        // Check if image data is null or empty
        if (!imageData) {
          return res.status(404).send('Image not found');
        }
  
        // Determine MIME type based on image data
        const mimeType = getImageMimeType(imageData);
  
        // If MIME type is null, respond with an error
        if (!mimeType) {
          return res.status(500).send('Error: Invalid image data');
        }
  
        // Set the correct content type header based on the image format
        res.contentType(mimeType);
        res.send(imageData);  // Send image data as the response
      } else {
        res.status(404).send('Image not found');
      }
    });
  });

  router.get('/logo/:organizationId', (req, res) => {
    const organizationId = req.params.organizationId;
  
    connection.query('SELECT organizationProfilePicture FROM organizationData WHERE organizationID = ?', [organizationId], (err, results) => {
      if (err) {
        console.error('Error retrieving image:', err);
        return res.status(500).send('Error retrieving image');
      }
  
      if (results.length > 0) {
        const imageData = results[0].organizationProfilePicture;

        // Check if image data is null or empty
        if (!imageData) {
          return res.status(404).send('Image not found');
        }
  
        // Determine MIME type based on image data
        const mimeType = getImageMimeType(imageData);
  
        // If MIME type is null, respond with an error
        if (!mimeType) {
          return res.status(500).send('Error: Invalid image data');
        }
  
        // Set the correct content type header based on the image format
        res.contentType(mimeType);
        res.send(imageData);  // Send image data as the response
      } else {
        res.status(404).send('Image not found');
      }
    });
  });


router.post('/addorganization', ensureAuthenticated, upload.fields([
    { name: 'organizationProfilePicture', maxCount: 1 },
    { name: 'organizationFeaturedPicture', maxCount: 1 }
]), (req, res) => {
    const {
        organizationName,
        organizationDescription,
        organizationPhoneNumber,
        organizationAddress,
        organizationAbbreviation,
        representativeName,
        representativeContactNumber
    } = req.body;

    // Retrieve the file buffers from the request
    const organizationLogo = req.files['organizationProfilePicture'] ? req.files['organizationProfilePicture'][0].buffer : null;
    const organizationFeaturedPicture = req.files['organizationFeaturedPicture'] ? req.files['organizationFeaturedPicture'][0].buffer : null;

    // SQL query to insert the organization data, including the image blobs
    const query = `
        INSERT INTO organizationData (
            organizationName, 
            organizationDescription, 
            organizationPhoneNumber, 
            organizationAddress, 
            organizationAbbreviation, 
            representativeName, 
            representativeContactNumber,
            organizationProfilePicture,
            organizationFeaturePicture
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Values for the query (including BLOBs for the images)
    const values = [
        organizationName,
        organizationDescription,
        organizationPhoneNumber,
        organizationAddress,
        organizationAbbreviation,
        representativeName,
        representativeContactNumber,
        organizationLogo,          // BLOB for the logo
        organizationFeaturedPicture // BLOB for the featured picture
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