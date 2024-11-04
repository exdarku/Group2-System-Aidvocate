
const express = require('express');
const app = express();


// Middleware for our backend/frontend
app.use(express.json());

const hostname = 'localhost';
const port = 3000;

const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const authRoutes = require('./routes/auth')

app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/auth', authRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
  