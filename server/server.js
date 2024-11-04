
const express = require('express');
const app = express();


// Middleware for our backend/frontend
app.use(express.json());

const hostname = 'localhost';
const port = 3000;

const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');

app.use('/', indexRoutes);
app.use('/login', loginRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
  