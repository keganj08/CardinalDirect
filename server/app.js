//Creates the server
var express = require('express');
var routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const nodemailer = require('nodemailer');
const { reset } = require('nodemon');


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

//get user by email - add later

let user = {
    email: "tsharris@noctrl.edu",
    username: "tsharris",
    pwd: "password"
  
}

const JWT_SECRET = 'secret'

app.set()
const port = 3000;
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes)

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
})

app.post('/forgot-password', (req, res, next) => {
    const { email } = req.body;
    //res.send(email);
    //check if user email is in db - add later
    if (email !== user.email){
        res.send("user not found");
        return;
    }

    //reset link
    const secret = JWT_SECRET + user.pwd;
    const payload = {
        email: user.email,
        username: user.username
    };
    const token = jwt.sign(payload, secret, {expiresIn: '15m'});
    const link = `http://localhost:3000/reset-password/${user.username}/${token}`;
    console.log(link);

    //send email
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: "directcardinal@gmail.com",
            pass: "csindustries"
        }
    });

    let mailOptions = {
        from: "CardinalDirect",
        to: user.email,
        subject: "Password Reset Link",
        text: link
    };

    transporter.sendMail(mailOptions, function(err, success){
        if(err){
            console.log(err)
        }else{
            console.log("Email Sent")
            res.send('Password reset link has been sent!')
        }
    });

})

app.get('/reset-password/:username/:token', (req, res, next) => {
    const { username, token } = req.params;
    //res.send(req.params);

    //check if user is in database - later
    if(username !== user.username){
        res.send('USER NOT FOUND')
        return;
    }
    const secret = JWT_SECRET + user.pwd;
    try {
        const payload = jwt.verify(token,secret)
        res.render('reset-password', {email: user.email})
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
})

app.post ('/reset-password/:username/:token', (req, res, next) => {
    const { username, token } = req.params;
    const {pwd, pwd2} = req.body;

    //check if username in db
    if(username !== user.username){
        res.send("USER NOT FOUND");
        return;
    }
    
    const secret = JWT_SECRET + user.pwd;
    try {
        const payload = jwt.verify(token, secret);

        //check for matching passwords - later

        //find user and update db - later
        //hash password - later
        user.pwd = pwd;
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }

})

app.listen(port, ()=> console.log("Server running on port: " + port));
