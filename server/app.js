//Creates the server
var express = require('express');
var routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connect } = require('mongodb');
const { connection } = require('mongoose');
const app = express();
const port = 3000;
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, ()=> console.log("Server running on port: " + port));





