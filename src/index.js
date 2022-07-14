const express = require('express');
//const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();



const routes = require('./route');

const app = express();
//app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://message-api.herokuapp.com/'
}));
app.use("/", routes);


console.log('hello world');

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log('listening at ' + port);
});


if (process.env.NODE.ENV === 'production'){
    app.use(express.static('client/src'));
}






