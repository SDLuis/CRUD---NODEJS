const express = require('express')

const app = express()
app.set('port', process.env.PORT || 5000)

app.get('/' , (req , res) =>{
    res.send('Done')
})
app.listen(app.get('port'), ()=>{
    console.log('Server running on port', app.get('port'))
})