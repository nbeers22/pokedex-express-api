require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

module.exports = app;