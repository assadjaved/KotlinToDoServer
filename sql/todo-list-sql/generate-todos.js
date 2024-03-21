const sqlPool = require('../sql-pool');

const query = `
INSERT INTO todo_items (title, description, priority, created_at)
VALUES
    ('Buy groceries', 'Need to buy milk, eggs, and bread', 1, UNIX_TIMESTAMP()),
    ('Read a book', 'Finish reading "The Great Gatsby"', 2, UNIX_TIMESTAMP()),
    ('Exercise', 'Go for a 30-minute run', 3, UNIX_TIMESTAMP());
`;

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

        console.log('Todo items have been generated');
    });
});