const sqlPool = require('../sql-pool');

const query = `DELETE FROM todo_items;`;

sqlPool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }

    connection.query(query, (err, results, fields) => {
        connection.release();
        if (err) {
            console.error('Error executing the query: ', err);
            return;
        }

        console.log('All todo items have been deleted');
    });
});