// sql query to create a todo item

const sqlPool = require('../sql-pool');

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

            connection.query(query, [title, description, priority], (err, results, fields) => {
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

module.exports = createTodo;