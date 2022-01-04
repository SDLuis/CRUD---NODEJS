const express = require("express");

const app = express();
const connection = require("../Database/database");

app.get("/opinion/List", (req, res) => {
    connection.query(
      "select * from opinionAnonym",
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  });

app.get("/opinion/:id/Details", (req, res) => {
    connection.query(
      `select * from opinionAnonym where opinion_id = ${req.params.id}`,
      (err, results) => {
        if (err) throw err;
        res.send(results);
      }
    );
  });
  
  module.exports = app;
  