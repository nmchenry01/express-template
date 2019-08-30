const Bunyan = require('bunyan');
const config = require('../config');

const logger = Bunyan.createLogger({
  name: 'Express-Template',
  level: config.logger.logLevel,
});

module.exports = logger;
