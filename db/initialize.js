const Sequelize = require('sequelize');

const { todoModel } = require('../models');
const utils = require('../utils');

const initialize = async () => {
  // Connect to Postgres
  const db = new Sequelize('local_database', 'postgres', null, {
    host: 'localhost',
    dialect: 'postgres',
  });

  // eslint-disable-next-line no-unused-vars
  const todo = todoModel(db);

  try {
    // Force creates new tables every time it is run
    await db.sync({ force: true });
    utils.logger.info('Model created successfully!');
  } catch (error) {
    utils.logger.error(`Failed to create model: ${error.message}`);
  }
};

initialize();
