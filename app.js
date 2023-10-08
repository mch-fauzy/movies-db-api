const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const routes = require('./routes');


// Sharing resources
app.use(cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use('/', routes);

module.exports = app;
