const express = require("express");
const  fs  = require("fs");
const jwt = require("jsonwebtoken");
const momment = require("moment");

const app = express();
const connection = require("../Database/database");

app.get("/opinion/List", (req, res) => {
    connection.query(
      "select * from opinionAnonym",
      (err, results) => {
        if (err) throw ('No hay conexion a base de datos');
        res.send(results);
      }
    );
  });

app.get("/opinion/:id/Details", (req, res) => {
    connection.query(
      `select * from opinionAnonym where opinion_id = ${req.params.id}`,
      (err, results) => {
        if (err) throw ('Ingrese un id correcto');
        res.send(results);
      }
    );
  });
  
  app.post("/opinion/add/", verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey1', (error) => {
        if(error){
          res.send('Complete el token de manera correcta')
            res.sendStatus(403);
        }else{
            const {opinion} = req.body

              if (opinion!== ""){
            connection.query("INSERT INTO opinionAnonym set ?", opinion ,(err) => {
                if (err) {
                    console.log(err);
                    res.send('Ingrese los campos de forma correcta')
                }
                    })
                    //Creando token 2 para editar opiniones
                    jwt.sign({opinion}, 'secretkey2', (err, token) => {
                      res.json({
                          token
                      })
                  })
        }else{

          console.log("Campo vacio")
          var now = new Date();

          var logfile_name = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes()
          fs.writeFile( logfile_name +'.txt', 'Error: "Campo vacio" - Tratando de agregar una opinion' , (error) =>{
            console.log(logfile_name)
          })
          
        }}})
    
  })
  app.post("/opinion/update/:id", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey2', (error) => {
      if(error){
        res.send('Complete el token de manera correcta')
          res.sendStatus(403);
      }else{
                const{ id } = req.params;
      const { opinion } = req.body
       connection.query(`UPDATE opinionAnonym set opinion = '${opinion}' WHERE opinion_id = ${id}` ,(err) => {
        if (err) {
            console.log(err);
            res.send('Ingrese los campos o el id de forma correcta')
        }
        else {
            res.send({
              message: "Opinion editada correctamente",
              code: 200,})
              }   })
            }
        })
    })
    
    app.delete("/opinion/delete/:id", async (req, res) => {
      const{ id } = req.params;
       await connection.query(`DELETE FROM opinionAnonym WHERE opinion_id = ${id}` ,(err) => {
        if (err) {
            console.log(err);
            res.send('Inserte un id existente o de forma correcta')
        }
        else {
            res.send({
              message: "Opinion eliminada correctamente",
              code: 200,})
             }
          })
    })

  // Funcion de verificar token
    function verifyToken(req, res, next){
      const bearerHeader =  req.headers['authorization'];
 
      if(typeof bearerHeader !== 'undefined'){
           const bearerToken = bearerHeader.split(" ")[1];
           req.token = bearerToken;
           next();
      }else{
          res.sendStatus(403);
          res.send('Ingrese el token de forma correcta')
      }
 }
  
  module.exports = app;
  