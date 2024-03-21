// sql query to retrieve all todo items

const sqlPool = require('../sql-pool');

const readTodo = () => {
    const query = `SELECT * FROM todo_items;`;

    return new Promise((resolve, reject) => {
        sqlPool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to the database: ', err);
                reject(err);
                return;
            }

            connection.query(query, (err, results, fields) => {
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

module.exports = readTodo;