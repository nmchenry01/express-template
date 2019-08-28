const { isNumeric, isAscii } = require('validator');
const { todoService } = require('../services');
const { logger } = require('../utils');

const getTodo = async (req, res) => {
  const { id } = req.params;

  // Validate parameter
  if (!isNumeric(id))
    return res.status(400).send({
      message: 'The id parameter is required, and must be a numeric string',
    });

  try {
    // Call appropriate service
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
  try {
    // Call appropriate service
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

const postTodo = async (req, res) => {
  const { name, description } = req.body;

  // Validate parameter
  if (!isAscii(name) || !isAscii(description))
    return res.status(400).send({
      message:
        'The body parameters "name" and "description" are required to be strings',
    });

  try {
    // Call appropriate service
    const id = await todoService.createTodo(name, description);

    // Only return the id of the created object
    return res.json(id);
  } catch (error) {
    // Handle all other errors
    logger.error(
      { event: 'error', type: 'getTodo', message: error.message },
      `Error creating todo: ${error.message}`,
    );

    return res.status(500).send({
      message: 'Internal server error',
    });
  }
};

module.exports = { getTodo, getTodos, postTodo };
