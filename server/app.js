//Creates the server
var express = require('express');
var routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const nodemailer = require('nodemailer');
const webpush = require('web-push');

const path = require('path');

app.use( express.static( "public" ) );
//app.use( express.static( path.join(__dirname, "client" )));

const { reset } = require('nodemon');
var mydb = require('./dbmgr.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

app.set()
const port = 3000;
app.use(bodyParser.json())
app.use(cors());


//vapid keys identify sender of push notification
//generated via 'web-push generate-vapid-keys' from within server/node_modules/.bin
const publicVapidKey = 'BMUZGiEE7XECrZ1UZJlqaawhJGq17kF_4emEs1g5OSzItEEe4Ezcs2ugH78Yf48a3ep3SjGqRYvNNBBppOtV-x8';
const privateVapidKey = 'rpL24G9aXwUBg3IjDU6k6KfhtrulvlmpycBxjC_nNno';

webpush.setVapidDetails('mailto:keganj08@gmail.com', publicVapidKey, privateVapidKey);

app.use('/', routes)

app.get('/', (req, res) => res.send('Server working!'))

app.listen(port, ()=> console.log("Server running on port: " + port));