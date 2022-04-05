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


router.post('/get_username', function(req, res){
	let email = req.body.email;
	mydb.findUserRecByEmail(email, function(result){
		if(result == null){
			res.send({"username" : null, "success" : false});
		}
		else{
			res.send({"username" : result[0].username, "success" : true});
		}
	});
});

router.post('/get_user', function(req, res){
	let email = req.body.email;
	mydb.findUserRecByEmail(email, function(result){
		/*if(result == null){
			res.send({"username" : null, "success" : false});
		}
		else{
			res.send({"username" : result[0].username, "success" : true});
		}*/
		res.send(result);
	});
});

router.post('/get_pnum', function(req, res){
	let email = req.body.email;
	mydb.findUserRecByEmail(email, function(result){
		if(result == null){
			res.send({"pnum" : null, "success" : false});
		}
		else{
			res.send({"pnum" : result[0].pnum, "success" : true});
		}
	});
});

router.post('/get_pwd', function(req, res){
	let email = req.body.email;
	mydb.findUserRecByEmail(email, function(result){
		if(result == null){
			res.send({"pwd" : null, "success" : false});
		}
		else{
			res.send({"pwd" : result[0].pwd, "success" : true});
		}
	});
});


router.post('/classes', function(req, res){
	// mode is either 's' for search, 'g' for get, 'a' for add, or 'd' for delete
	let mode = req.body.mode;
	if (mode === 's'){
		console.log("Search for Classes");
		let keys = [];
		let values = [];
		let jsonData = req.body.searchParams;
		Object.keys(jsonData).forEach(function(key) {
			if (jsonData[key] !== ''){
				keys.push(key);
				values.push(jsonData[key]);
			}
		});
		//console.log(keys);
		//console.log(values);
		mydb.searchForClasses(keys, values, function(result){
			res.send(result);
		});
	}
	else if(mode === 'g'){
		console.log("Get Classes");
		mydb.findClassesByEmail({"email" : req.body.email}, function(result){
			res.send(result);
		});
	}
	else if(mode === 'a'){
		console.log("Add Class");
		let newRec = {
			"email" : req.body.email,
			"cid" : req.body.cid
		};
		mydb.addEnroll(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else{ //mode === 'd'
		console.log("Delete Class");
		let delRec = {
			"email" : req.body.email,
			"cid" : req.body.cid
		};
		mydb.deleteEnroll(delRec, function(result){
			res.send({"status" : "success"});
			//res.send(result);
		});
	}
});

router.post('/assignments', function(req, res){
	// mode is either 'g' for get, 'a' for add, 'u' for update, or 'd' for delete
	let mode = req.body.mode;
	if(mode === 'g'){
		console.log("Get Assignments");
		mydb.findAssignmentsByEmailAndDate({"email" : req.body.email, "dueDate" : req.body.dueDate}, function(result){
			res.send(result);
		});
	}
	else if(mode === 'a'){
		console.log("Add Assignment");
		let newRec = {
			"title" : req.body.title,
			"dueDate" : req.body.dueDate,
			"dueTime" : req.body.dueTime,
			"email" : req.body.email,
			"cid" : req.body.cid
		};
		mydb.addAssignment(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else if(mode === 'u'){
		console.log("Update Assignment");
		let updateRec = {
			"title" : req.body.title,
			"dueDate" : req.body.dueDate,
			"dueTime" : req.body.dueTime,
			"cid" : req.body.cid,
			"id" : parseInt(req.body.id)
		};
		mydb.updateAssignment(updateRec, function(result){
			res.send({"status" : "success"});
		});
	}
	else{ //mode === 'd'
		console.log("Delete Assignment");
		mydb.deleteAssignment({"id" : parseInt(req.body.id)}, function(result){
			res.send({"status" : "success"});
			//res.send(result);
		});
	}
});

router.post('/notes', function(req, res){
	// mode is either 'g' for get, 'a' for add, 'u' for update, or 'd' for delete
	let mode = req.body.mode;
	if(mode === 'g'){
		console.log("Get Notes");
		mydb.findNotesByEmail({"email" : req.body.email}, function(result){
			res.send(result);
		});
	}
	else if(mode === 'a'){
		console.log("Add Note");
		let newRec = {
			"noteTitle" : req.body.title,
			"noteText" : req.body.text,
			"email" : req.body.email
		};
		mydb.addNote(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else if(mode === 'u'){
		console.log("Update Note");
		let updateRec = {
			"noteTitle" : req.body.title,
			"noteText" : req.body.text,
			"id" : parseInt(req.body.id)
		};
		mydb.updateNote(updateRec, function(result){
			res.send({"status" : "success"});
		});
	}
	else{ //mode === 'd'
		console.log("Delete Note");
		mydb.deleteNote({"id" : parseInt(req.body.id)}, function(result){
			res.send({"status" : "success"});
			//res.send(result);
		});
	}
});
router.post('/settings', function(req, res){
	let mode = req.body.mode;
	if(mode === 'u'){
		console.log("Update Account");
		let newRec = {
			"username" : req.body.username,
			"pwd" : req.body.pwd,
			"pnum" : req.body.pnum,
			"email" : req.body.email
		};
		mydb.updateAccount(newRec, function(result){
			
			res.send(result);
		});
}
});

module.exports = router;