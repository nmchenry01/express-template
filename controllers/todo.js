const getTodo = async (_, res) => {
  res.json({ content: 'sometodo' });
};

const postTodo = async (_, res) => {
  res.send('Posted a todo!');
};

module.exports = { getTodo, postTodo };
