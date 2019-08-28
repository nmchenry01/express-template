/*
  Purpose:
    - This is the entry point for the application
    - Should be relatively minimal
    - Instantiates express API, adds middleware, uses routes, connects to database, starts up server, etc
*/

const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Disable x-powered-by header for security
app.disable('x-powered-by');

// Instantiate middleware
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

app.listen(8080, () => console.log('Hello World!'));
