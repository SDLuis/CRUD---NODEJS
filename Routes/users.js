const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const app = express();
const connection = require("../Database/database");

// see users
app.get("/users",verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey1', (error) => {

    if(error){
      Errorfilegenerator("Complete el token de manera correcta", "Tratando de filtrar todos los usuarios")
      res.send('Complete el token de manera correcta')
    }else{

    connection.query(
      "select * from users",
      (err, results) => {
        if (err){ 
          Errorfilegenerator("Error al extraer la consulta", "Tratando de filtrar todos los usuarios")
                } 
        else{res.send(results);}
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
//Generados de archivos de errores
function Errorfilegenerator(error,Endpoint){
  var now = new Date();

  var logfile_name = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes()
  fs.writeFile( logfile_name +'.txt', error + '\n- '+ Endpoint , (error) =>{
    console.log(logfile_name)
  })
}
  module.exports = app;