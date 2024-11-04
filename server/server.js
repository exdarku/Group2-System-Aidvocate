
const express = require('express');
const app = express();


// Middleware for our backend/frontend
app.use(express.json());

const hostname = '127.0.0.1';
const port = 3000;

const indexRoutes = require('./routes/index');

app.use('/', indexRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
  
  