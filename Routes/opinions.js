const express = require("express");
const  fs  = require("fs");
const jwt = require("jsonwebtoken");
const app = express();
const connection = require("../Database/database");

app.get("/opinion/List", verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey1', (error) => {

    if(error){
      res.send('Complete el token de manera correcta')
    }else{

    connection.query(
      "select * from opinionAnonym",
      (err, results) => {
        if (err) throw (err);
        res.send(results);
      });
    }})
  });

app.get("/opinion/:id/Details", verifyToken, (req, res) => {

  jwt.verify(req.token, 'secretkey1', (error) => {

    if(error){
      res.send('Complete el token de manera correcta')
    }else{

    connection.query(
      `select * from opinionAnonym where opinion_id = ${req.params.id}`,
      (err, results) => {
        if (err) throw ('Ingrese un id correcto');
        res.send(results);
      });
    }})
  });
  
  app.post("/opinion/add/", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey1', (error) => {
        if(error){
          res.send('Complete el token de manera correcta')
        }else{
            const setOpinion = 
            {opinion: req.body.opinion}
          if(req.body.opinion !== ""){
            connection.query("INSERT INTO opinionAnonym  set ?", [setOpinion] ,(err) => {
                if (err) {
                    console.log(err);
                    res.send('Ingrese los campos de forma correcta')
                }else{
                  jwt.sign({setOpinion}, 'secretkey2', (err, token) => {
                  res.json({ token })  
                  datatimetokenregister('Token 2 - Agregando opinion')
                })
                }
              })
        }else{
          Errorfilegenerator('Campo vacio', "Tratando de agregar una opinion")
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
      if (opinion!== ""){
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
            }else{  
              Errorfilegenerator('Campo vacio', "Tratando de editar una opinion")
              console.log("Campo vacio")
            }
          }
        })
    })
    
    app.delete("/opinion/delete/:id", verifyToken, (req, res) => {
      jwt.verify(req.token, 'secretkey2', (error) => {
        if(error){
          res.send('Complete el token de manera correcta')
        }else{

        const{ id } = req.params;
        connection.query(`DELETE FROM opinionAnonym WHERE opinion_id = ${id}` ,(err) => {
        if (err) {
            console.log(err);
            res.send('Inserte un id existente o de forma correcta')
            Errorfilegenerator("id insertado de forma errorea", "Tratando de eliminar una opinion")
        }
        else {
            res.send({
              message: "Opinion eliminada correctamente",
              code: 200,})
             }
          })
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
//Funcion que agrega registro de las fechas de solicitud de tokens

  function datatimetokenregister(numbertoken){

    var now = new Date();
    var logfile = now.getFullYear() + "/"+ now.getUTCMonth() + "/" + now.getDate() + "-" + now.getHours() + ":" + now.getMinutes()

    fs.appendFile('Registro.txt', '\n'+ logfile +'   -   '+ numbertoken ,(error) =>{

    if(!error){ console.log('Registro agregado') }
    else{console.log(`Error: ${error}`);}
    })
  }
  module.exports = app;
  