const { isNumeric } = require('validator');
const { todoService } = require('../services');
const { logger } = require('../utils');

const getTodo = async (req, res) => {
  const { id } = req.params;

  // Validate parameter
  if (!id || !isNumeric(id))
    return res.status(400).send({
      message: 'The id parameter is required, and must be a numeric string',
    });

  // Call appropriate service
  try {
    const todo = await todoService.getTodoById(id);

    // Handle if object not found
    if (!todo) {
      return res.status(404).send({
        message: `Todo with ID ${id} not found`,
      });
    }

    return res.json(todo);
  } catch (error) {
    // Handle all other errors
    logger.error(
      { event: 'error', type: 'getTodo', id, message: error.message },
      `Error retrieving todo: ${error.message}`,
    );

    return res.status(500).send({
      message: 'Internal server error',
    });
  }
};

const getTodos = async (_, res) => {
  // Call appropriate service
  try {
    const todos = await todoService.getAllTodos();

    return res.json(todos);
  } catch (error) {
    // Handle all other errors
    logger.error(
      { event: 'error', type: 'getTodos', message: error.message },
      `Error retrieving all todos: ${error.message}`,
    );

    return res.status(500).send({
      message: 'Internal server error',
    });
  }
};

const postTodo = async (_, res) => {
  return res.send('Posted a todo!');
};

module.exports = { getTodo, getTodos, postTodo };
