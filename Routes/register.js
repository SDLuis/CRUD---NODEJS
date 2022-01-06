const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const app = express();
const connection = require("../Database/database");
//Endpoint para registrar usuarios
app.post("/register", async (req, res) => {
    const newRegister = {
      fname_user: req.body.fname_user,
      lname_user: req.body.lname_user,
      age_user: req.body.age_user

    };
 await connection.query("INSERT INTO users set ?", [newRegister] ,(err) => {
      if (err) {
          console.log(err);
          Errorfilegenerator("Complete los campos de manera correcta", "Registro de usuario")
          res.send('Complete los campos de manera correcta')
      }
      else {
        //Creando token 1 para dar paso a agregar opinion
        jwt.sign({newRegister}, 'secretkey1', (err, token) => {
            res.json({ token })
            datatimetokenregister('Token 1 - Registro de usuario')
          res.send({
              message: "Registrado correctamente",
              code: 200,}) 
                })
          }
          })
  })

  //Funcion que agrega registro de las fechas de solicitud de tokens

  function datatimetokenregister(numbertoken){

    var now = new Date();
    var logfile = now.getFullYear() + "/"+ now.getMonth() + "/" + now.getDate() + "-" + now.getHours() + ":" + now.getMinutes()

    fs.appendFile('Registro.txt', '\n'+ logfile +'   -   '+ numbertoken ,(error) =>{

    if(!error){ console.log('Registro agregado') }
    else{console.log(`Error: ${error}`);}
    })
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