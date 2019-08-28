const sequelize = require('sequelize');

const todoModel = db => {
  const todo = db.define('todo', {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: sequelize.STRING, allowNull: false },
    description: { type: sequelize.TEXT, allowNull: false },
  });

  return todo;
};

module.exports = todoModel;
