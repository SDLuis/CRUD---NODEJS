const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const connection = require("../Database/database");

app.post("/register", async (req, res) => {
    const newRegister = {
      fname_user: req.body.fname_user,
      lname_user: req.body.lname_user,
      age_user: req.body.age_user

    };
 await connection.query("INSERT INTO users set ?", [newRegister] ,(err) => {
      if (err) {
          console.log(err);
          res.send('Complete el token de manera correcta')
      }
      else {
        //Creando token 1 para dar paso a agregar opinion
        jwt.sign({newRegister}, 'secretkey1', (err, token) => {
            res.json({ token })
          res.send({
              message: "Registrado correctamente",
              code: 200,}) 
                })
          }
          })
  })

 


module.exports = app;