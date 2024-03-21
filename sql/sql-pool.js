const mysql = require('mysql2');

const sqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysqldb123',
    database: 'todo_items_db'
});

module.exports = sqlPool;
