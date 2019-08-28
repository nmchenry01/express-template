const { isNumeric } = require('validator');
const { todoService } = require('../services');
const { logger } = require('../utils');

const getTodo = async (req, res) => {
  const { id } = req.params;

  // Validate parameter
  if (!id || !isNumeric(id))
    res.status(400).send({
      message: 'The id parameter is required, and must be a numeric string',
    });

  // Call appropriate service
  try {
    const todo = await todoService.getTodoById(id);

    // Handle if object not found
    if (!todo) {
      res.status(404).send({
        message: `Todo with ID ${id} not found`,
      });
    }
    const { name, description } = todo.toJSON();

    // Only return what we want client to be aware of
    res.json({ name, description });
  } catch (error) {
    // Handle all other errors
    logger.error(
      { event: 'error', type: 'getTodo', message: error.message },
      `Error retrieving todo: ${error.message}`,
    );

    res.status(500).send({
      message: 'Internal server error',
    });
  }
};

const postTodo = async (_, res) => {
  res.send('Posted a todo!');
};

module.exports = { getTodo, postTodo };
