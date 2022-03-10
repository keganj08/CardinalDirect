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
	mydb.addUser(newRec);
	
	/*
	mydb.findRec({'username':username}, function(result){
		if(result == null)
			mydb.insertRec({'username': username, 'score' : 0});
		res.send();
	});
	*/
});

module.exports = router;