const express = require('express');
const todoListApi = require('./api/todo-list-api');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/v1/todos', todoListApi);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
