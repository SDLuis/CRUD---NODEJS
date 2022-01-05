const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 5000)
app.use(require("./Routes/opinions"))
app.use(require("./Routes/users"))
app.use(require("./Routes/register"))


app.get('/' , (req , res) =>{
    res.send('U r Online :)')
})
app.listen(app.get('port'), ()=>{
    console.log('Server running on port', app.get('port'))
})