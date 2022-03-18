var express = require('express');
var router = express.Router();

var mydb = require('./dbmgr.js');

router.post('/new_user', function(req, res){
	let username = req.body.username;
	let email = req.body.email;
	let pwd = req.body.password;
	let pnum = req.body.pnum;
	let newRec = {
		"username" : username,
		"email" : email,
		"pwd" : pwd,
		"pnum" : pnum
	};
	let responseObj = {'user' : null};
	mydb.addUser(newRec, function(result){
		let idx = result.indexOf("@noctrl.edu");
		if (idx != -1){
			responseObj.user = result.substr(0, idx);
		}
		res.send(responseObj);
	});
});


router.post('/login', function(req, res){
	let email = req.body.email;
	let pwd = req.body.password;
	mydb.findUserRecByEmail(email, function(result){
		if(result == null || result[0].pwd !== pwd){
			res.send({"user" : null, "success" : false});
		}
		else{ // (result[0].pwd === pwd)
			let idx = email.indexOf("@noctrl.edu");
			if (idx != -1){
				user = email.substr(0, idx);
			}
			res.send({"user" : user, "success" : true});
		}
	});
});


module.exports = router;