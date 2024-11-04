const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.sqlHost,
    user: process.env.sqlUsername,
    password: process.env.sqlPassword,
    database: process.env.sqlDB
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to SQL database!");
})

router.post('/register', (req, res) => {
    console.log("BODY: " + JSON.stringify(req.body, null, 2));
    const {firstName, lastName, username, password} = req.body;
    connection.query("INSERT INTO users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)", [firstName, lastName, username, password], (err, results) => {
        if (err) throw err;
        res.status(201).json({message: "User registered successfuly"});
    });
})


module.exports = router;