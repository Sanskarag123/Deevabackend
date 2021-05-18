//Server File  
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require("cors")
const app = express();
require('dotenv').config()





app.use(cors())
app.use(bodyParser.json());

app.use('/api',routes);
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.get('/',function(req,res){
    res.send('connected to Server')
})
const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(process.env.PORT||8080,HOST,()=> {
console.log("Server listening in port 3000");
});



module.exports = app;