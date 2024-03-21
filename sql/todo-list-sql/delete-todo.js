// sql query to delete a todo item

const sqlPool = require('../sql-pool');

const deleteTodo = (id) => {
    const query = `
    DELETE FROM todo_items
    WHERE id = ?;
    `;

    return new Promise((resolve, reject) => {
        sqlPool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
                reject(err);
                return;
            }

            connection.query(query, [id], (err, results, fields) => {
                connection.release();
                console.log('results:', results);
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

module.exports = deleteTodo;