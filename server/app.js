//Creates the server
var express = require('express');
var routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const nodemailer = require('nodemailer');

const { reset } = require('nodemon');
var mydb = require('./dbmgr.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.set()
const port = 3000;
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, ()=> console.log("Server running on port: " + port));
