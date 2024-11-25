const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "serverless-us-central1.sysp0000.db2.skysql.com",
  port: 4007,
  user: "dbpgf12956485",
  password: "p@ssw0rdem0ti0nl@tte",
  database: "emotion_latte",
  connectionLimit: 5,
  ssl: {
    rejectUnauthorized: true
  }
});

module.exports = pool;