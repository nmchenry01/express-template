const models = require('../../models');
const { logger } = require('../../utils');

const initialize = async () => {
  try {
    // Force creates new tables every time it is run
    await models.sequelize.sync({ force: true });
    await models.sequelize.close();
    logger.info('Model created successfully!');
  } catch (error) {
    logger.error(`Failed to create model: ${error.message}`);
  }
};

initialize();
