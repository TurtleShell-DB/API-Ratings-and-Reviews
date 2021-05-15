const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: '13.59.68.85',
  port: '3306',
  user: 'root',
  password: 'Datsuki1!',
  database: 'products'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

module.exports = db;
