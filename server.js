// Constants 
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./configs/configDb');

app.use(express.urlencoded());
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(err,"There is some error in listen");
        return;
    }
    console.log('server is running on port',port);
})