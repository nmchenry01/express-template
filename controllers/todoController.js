const { isNumeric } = require('validator');
const { todoService } = require('../services');
const { logger } = require('../utils');

const getTodo = async (req, res) => {
  const { id } = req.params;

  // Validate id
  if (!id || !isNumeric(id))
    res.status(400).send({
      message: 'The id parameter is required, and must be a numeric string',
    });

  // Call appropriate service
  try {
    const todo = await todoService.getTodoById(id);
    const { name, description } = todo.toJSON();

    res.json({ name, description });
  } catch (error) {
    logger.error(
      { event: 'error', type: 'getTodo', message: error.message },
      `Error retrieving todo: ${error.message}`,
    );

    res.status(404).send({
      message: 'Failed to retrieve todo',
    });
  }
};

const postTodo = async (_, res) => {
  res.send('Posted a todo!');
};

module.exports = { getTodo, postTodo };
