const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const CONFIG = require("./configs")

// Sharing resources
app.use(cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static(CONFIG.IMG.STATIC));

app.use('/', routes);

module.exports = app;
