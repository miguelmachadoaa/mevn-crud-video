const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host:'localhost',
    port:3306,
    database:'node',
    user:'root',
    password:''

});

module.exports = connection;