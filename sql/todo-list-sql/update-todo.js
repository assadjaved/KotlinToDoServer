// sql query to update a todo item

const sqlPool = require('../sql-pool');
const readTodoById = require('./read-todo-by-id');

const updateTodo = (id, title, description, priority, completedAt) => {
    const query = `
    UPDATE todo_items
    SET title = ?, description = ?, priority = ?, completed_at = ?
    WHERE id = ?;
    `;

    return new Promise((resolve, reject) => {
        sqlPool.getConnection(async (err, connection) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
                reject(err);
                return;
            }

            try {
                const todoItems = await readTodoById(id);
                if (!todoItems.length) {
                    reject(new Error('Todo item not found'));
                    return;
                }
                connection.query(query, [title, description, priority, completedAt, id], async (err, results, fields) => {
                    connection.release();
                    if (err) {
                        console.error('Error executing the query: ', err);
                        reject(err);
                        return;
                    }

                    try {
                        const todoItem = await readTodoById(id);
                        resolve(todoItem[0]);
                    } catch (err) {
                        reject(err);
                    }
                });
            } catch (err) {
                reject(err);
                return;
            }
        });
    });
}

module.exports = updateTodo;