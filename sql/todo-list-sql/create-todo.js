// sql query to create a todo item

const sqlPool = require('../sql-pool');
const readTodoById = require('./read-todo-by-id');

const createTodo = (title, description, priority) => {
    const query = `
    INSERT INTO todo_items (title, description, priority, created_at)
    VALUES (?, ?, ?, UNIX_TIMESTAMP());
    `;

    return new Promise((resolve, reject) => {
        sqlPool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
                reject(err);
                return;
            }

            connection.query(query, [title, description, priority], async (err, results, fields) => {
                connection.release();
                if (err) {
                    console.error('Error executing the query: ', err);
                    reject(err);
                    return;
                }

                const id = results.insertId;
                try {
                    const todoItem = await readTodoById(id);
                    resolve(todoItem[0]);
                } catch (err) {
                    reject(err);
                }
            });
        });
    });
}

module.exports = createTodo;