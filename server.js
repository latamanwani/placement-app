// Constants 
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
// const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/configDb');
// app.use(express.static('./assets'));
// const cookieParser = require('cookie-parser');
// const sassMiddleware  = require('node-sass-middleware') ; 

app.use(express.urlencoded());
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
// app.use(cookieParser());
// app.use(expressLayouts);


// use express router
app.use('/', require('./routes'));


// set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log(err,"There is some error in listen");
        return;
    }
    console.log('server is running on port',port);
})