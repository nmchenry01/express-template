const models = require('../models');

const createTodo = async (name, description) => {};

const getTodoById = async id => {
  try {
    const todo = models.Todo.findByPk(id);
    return todo;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { createTodo, getTodoById };
