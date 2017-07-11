const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/db');

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
  console.log('Connected to the database.');
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// Instantiate express
const app = express();

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// Set body parser middleware
app.use(bodyParser.json());

// Initialize routes
app.use('/api', require('./routes/users'));

// Start the server
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Listening on port ' + port);
});
