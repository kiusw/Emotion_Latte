const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "p@ssw0rd",
  database: "emotionlatte",
  connectionLimit: 5,
});

module.exports = pool;
