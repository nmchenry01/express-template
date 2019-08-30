const models = require('../../models');
const { logger } = require('../../utils');

const seed = async () => {
  const seedData = [
    { name: 'note1', description: 'some description goes here' },
    { name: 'note2', description: 'some other description goes here' },
    { name: 'note3', description: 'annnnnnd more stuff' },
  ];

  try {
    const promises = seedData.map(data => models.Todo.create(data));
    await Promise.all(promises);
    await models.sequelize.close();
    logger.info({ event: 'Success' }, 'Successfully seeded the database');
  } catch (error) {
    logger.error(
      { event: 'Error', message: error.message },
      `Failed to seed test database: ${error.message}`,
    );
  }
};

seed();
