/*
  Purpose:
    - This is where we will store configurations that change by environment
    - Example: Log level, db connection strings, etc
*/

const config = {
  app: {
    port: 8080,
  },
  logger: {
    logLevel: 'info',
  },
  postgres: {
    // Default
    [process.env.NODE_ENV]: {
      username: 'postgres',
      password: null,
      database: 'database_development',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
    production: {
      username: 'postgres',
      password: null,
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'postgres',
    },
  }[process.env.NODE_ENV],
};

module.exports = config;
