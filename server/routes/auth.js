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
    const {firstName, lastName, username, password} = req.body;
    connection.query("INSERT INTO users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)", [firstName, lastName, username, password], (err, results) => {
        if (err) throw err;
        res.status(201).json({message: "User registered successfuly"});
    });
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).json({message: "Username and Password are both required."});
    }

    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) throw err;
        const userData = results[0];
        if (results.length === 0){
            res.status(401).json({message: "Invalid username/password"});
        } else {
            if (userData.password === password) {
                res.status(201).json({message: "User authenticated"});
            } else {
                res.status(401).json({message: "Invalid username/password 2"});
            }
        }
    })
})


module.exports = router;