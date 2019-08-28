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

const config = require('./config');
const routes = require('./routes');
const utils = require('./utils');

const app = express();

// Disable x-powered-by header for security
app.disable('x-powered-by');

// Instantiate middleware
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined'));

// Basic get endpoint
app.get('/', (_, res) => res.send('Application is live'));

// Routes middleware
app.use('/api', routes);

app.listen(config.app.port, () =>
  utils.logger.info(
    { event: 'Startup', port: `${config.app.port}` },
    `Server running on port ${config.app.port}`,
  ),
);
