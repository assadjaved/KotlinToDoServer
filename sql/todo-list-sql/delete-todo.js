// sql query to delete a todo item

const sqlPool = require('../sql-pool');
const readTodoById = require('./read-todo-by-id');

const deleteTodo = (id) => {
    const query = `
    DELETE FROM todo_items
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
                connection.query(query, [id], (err, results, fields) => {
                    connection.release();
                    if (err) {
                        console.error('Error executing the query: ', err);
                        reject(err);
                        return;
                    }
    
                    resolve(todoItems[0]);
                });
            } catch (err) {
                reject(err);
                return;
            }
        });
    });
}

module.exports = deleteTodo;