const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, ()=>{
console.log('Server running on port')
} ) 
app.use(require("./Routes/opinions"))
app.use(require("./Routes/users"))
app.use(require("./Routes/register"))


app.get('/HOME' , (req , res) =>{
    res.send('WELCOME :)'+ '\n Ve a register "/Register" para continuar')
})
