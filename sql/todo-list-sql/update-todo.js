// sql query to update a todo item

const sqlPool = require('../sql-pool');

const updateTodo = (id, title, description, priority) => {
    const query = `
    UPDATE todo_items
    SET title = ?, description = ?, priority = ?
    WHERE id = ?;
    `;

    return new Promise((resolve, reject) => {
        sqlPool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
                reject(err);
                return;
            }

            connection.query(query, [title, description, priority, id], (err, results, fields) => {
                connection.release();
                if (err) {
                    console.error('Error executing the query: ', err);
                    reject(err);
                    return;
                }

                resolve(results);
            });
        });
    });
}

module.exports = updateTodo;