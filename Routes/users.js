const express = require("express");

const app = express();
const connection = require("../Database/database");

// see users
app.get("/users", (req, res) => {
    connection.query(
      "select * from users",
      (err, results) => {
        if (err) throw ('No hay conexion a base de datos');
        res.send(results);
      }
    );
  });

  module.exports = app;