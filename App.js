// Declare core modules
const express = require('express');

const path = require('path');
const port = process.env.PORT || 4000; 

const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();

app.set('view engine', 'hbs');
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/registerRoutes'));


app.listen(port, (request , response) => {
    console.log(`Server run at ${port}`);
});