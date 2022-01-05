const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const connection = require("../Database/database");

// see users
app.get("/users",verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey1', (error) => {

    if(error){
      res.send('Complete el token de manera correcta')
    }else{

    connection.query(
      "select * from users",
      (err, results) => {
        if (err) throw ('No hay conexion a base de datos');
        res.send(results);
      });
    }})
  });
// Funcion de verificar token
function verifyToken(req, res, next){
  const bearerHeader =  req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1];
       req.token = bearerToken;
       next();
  }else{
      res.send('Token sin ingresar o ingresado de forma correcta')
  }
}
  module.exports = app;