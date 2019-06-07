const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

module.exports = app;