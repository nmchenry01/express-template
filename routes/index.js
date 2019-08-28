/*
  Purpose:
    - This is where we will route requests to controllers, which ideally is a 1:1 relationship
    - Should contain absolutely no business logic or complexity
    - Each route should represent an endpoint for the API
    - Example: Routes a /todo/:id request to the todo.getTodo controller, etc
*/

const express = require('express');

const { todo } = require('../controllers');

const router = express.Router();

router.get('/todo/:id', todo.getTodo);
router.get('/todo', todo.getTodos);
router.post('/todo', todo.postTodo);

module.exports = router;
