// create sql query to read a todo item by id

const sqlPool = require('../sql-pool');

const readTodoById = (id) => {
    const query = `
    SELECT * FROM todo_items WHERE id = ?;
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

module.exports = readTodoById;