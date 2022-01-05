const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: "biwykrp7dwrapbsl3xzb-mysql.services.clever-cloud.com",
  port: 3306,
  user: "uil65sp2hs48jzv0",
  password: "sqJdKk0ewq0ilK7C5o8q",
  database: "biwykrp7dwrapbsl3xzb",
});

const pool = mysql.createPool(connection);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error / "DATABASE CONNECTION WAS CLOSED";
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error / "DATABASE HAS TOO MANY CONNECTIONS";
    }
    if (err.code === "ECONNREFUSED") {
      console.error / "DATABASE CONNECTION WAS REFUSED";
    }
  }

  if (connection) connection.release();
  console.log("Base de datos conectada");
});

pool.query = promisify(pool.query);

module.exports = connection;
