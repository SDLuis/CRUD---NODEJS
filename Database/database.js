const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "biwykrp7dwrapbsl3xzb-mysql.services.clever-cloud.com",
  port: 3306,
  user: "uil65sp2hs48jzv0",
  password: "sqJdKk0ewq0ilK7C5o8q",
  database: "biwykrp7dwrapbsl3xzb",
});

module.exports = connection;
