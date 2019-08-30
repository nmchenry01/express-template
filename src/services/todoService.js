const models = require('../models');

const createTodo = async (name, description) => {
  const payload = { name, description };

  try {
    // Returns the "Todo" entity that was created
    const todo = await models.Todo.create(payload);

    const { id } = todo.toJSON();

    return { id };
  } catch (error) {
    throw Error(error.message);
  }
};

const getTodoById = async id => {
  try {
    // Returns a single "Todo" entity
    const todo = await models.Todo.findByPk(id);

    // Case where nothing was found
    if (!todo) {
      return null;
    }

    const { name, description } = todo.toJSON();

    return { name, description };
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllTodos = async () => {
  try {
    // Returns an array of "Todo" entities, empty array if nothing found
    const todos = await models.Todo.findAll();

    return todos.map(todo => {
      const { name, description } = todo.toJSON();
      return { name, description };
    });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { createTodo, getTodoById, getAllTodos };
