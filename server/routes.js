var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { reset } = require('nodemon');
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

router.post('/meetings', function(req, res){
	// mode is either 'g' for get, 'a' for add, 'u' for update, or 'd' for delete
	let mode = req.body.mode;
	if(mode === 'g'){
		console.log("Get Meetings");
		mydb.findMeetingsByEmailAndDate({"email" : req.body.email, "meetDate" : req.body.meetDate}, function(result){
			res.send(result);
		});
	}
	else if(mode === 'a'){
		console.log("Add Meeting");
		let newRec = {
			"title" : req.body.title,
			"building" : req.body.building,
			"roomNum" : req.body.roomNum,
			"start" : req.body.start,
			"end" : req.body.end,
			"meetDate" : req.body.meetDate,
			"email" : req.body.email
		};
		mydb.addMeeting(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else if(mode === 'u'){
		console.log("Update Meeting");
		let updateRec = {
			"title" : req.body.title,
			"building" : req.body.building,
			"roomNum" : req.body.roomNum,
			"start" : req.body.start,
			"end" : req.body.end,
			"meetDate" : req.body.meetDate,
			"id" : parseInt(req.body.id)
		};
		mydb.updateMeeting(updateRec, function(result){
			res.send({"status" : "success"});
		});
	}
	else{ //mode === 'd'
		console.log("Delete Meeting");
		mydb.deleteMeeting({"id" : parseInt(req.body.id)}, function(result){
			res.send({"status" : "success"});
			//res.send(result);
		});
	}
});

router.post('/todo_lists', function(req, res){
	// mode is either 'g' for get, 'a' for add, 'u' for update, or 'd' for delete
	let mode = req.body.mode;
	if(mode === 'g'){
		console.log("Get ToDo List");
		mydb.findToDoListByEmailAndDate({"email" : req.body.email, "listDate" : req.body.listDate}, function(result){
			res.send(result);
		});
	}
	else if(mode === 'a'){
		console.log("Add ToDo List");
		let newRec = {
			"listDate" : req.body.listDate,
			"email" : req.body.email
		};
		mydb.addToDoList(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else if(mode === 'u'){
		console.log("Update ToDo List");
		let updateRec = {
			"listDate" : req.body.title,
			"id" : parseInt(req.body.id)
		};
		mydb.updateToDoList(updateRec, function(result){
			res.send({"status" : "success"});
		});
	}
	else{ //mode === 'd'
		console.log("Delete ToDo List");
		mydb.deleteToDoList({"id" : parseInt(req.body.id)}, function(result){
			res.send({"status" : "success"});
			//res.send(result);
		});
	}
});


router.post('/todo_list_items', function(req, res){
	// mode is either 'a' for add, 'u' for update, or 'd' for delete
	let mode = req.body.mode;
	if(mode === 'a'){
		console.log("Add ToDo List Item");
		let newRec = {
			"tid" : req.body.tid,
			"description" : req.body.description,
			"isComplete" : req.body.isComplete
		};
		mydb.addToDoListItem(newRec, function(result){
			res.send({"id" : "" + result});
		});
	}
	else if(mode === 'u'){
		console.log("Update ToDo List Item");
		let updateRec = {
			"tid" : parseInt(req.body.tid),
			"description" : req.body.description,
			"isComplete" : req.body.isComplete
		};
		mydb.updateToDoListItem(updateRec, function(result){
			res.send({"status" : "success"});
		});
	}
	else{ //mode === 'd'
		console.log("Delete ToDo List Item");
		mydb.deleteToDoListItem({"tid" : parseInt(req.body.tid), "description" : req.body.description}, function(result){
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

//FORGOT PASSWORD

var path = require("path")

router.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password');
	
})

router.get('/logo' , (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/assets/images/cardinaldirect_logo.jpg'));
})

router.get('/login-css' , (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/assets/css/login_style.css'));
	
})

router.get('/icon' , (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', '/assets/images/browserIcon.jpg'));
	
})

const JWT_SECRET = 'secret'
router.post('/forgot-password', (req, res, next) => {
    const { email } = req.body;

	mydb.findUserRecByEmail(email, function(result){
		user = {
			email: result[0].email,
			username: result[0].username,
			pwd: result[0].pwd,
			pnum : result[0].pnum
		  
		}

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
		const token = jwt.sign(payload, secret, {expiresIn: '1hr'});
		
		const link = `http://localhost:3000/reset-password/${user.email}/${token}`;
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
	});

})


router.get('/reset-password/:email/:token', (req, res, next) => {
    const { email, token } = req.params;
	console.log(email);

	mydb.findUserRecByEmail(email, function(result){
		user = {
			email: result[0].email,
			username: result[0].username,
			pwd: result[0].pwd,
			pnum : result[0].pnum	
		}
		console.log(user.email);//invalid signature
		//check if user is in database - later
		if(email !== user.email){
			res.send(user.email)
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
	});
})



router.post ('/reset-password/:email/:token', (req, res, next) => {
    const { email, token } = req.params;
    const {pwd, pwd2} = req.body;
	mydb.findUserRecByEmail(email, function(result){
		user = {
			email: result[0].email,
			username: result[0].username,
			pwd: result[0].pwd,
			pnum : result[0].pnum
		}

		//check if username in db
		if(email !== user.email){
			res.send("USER NOT FOUND");
			return;
		}
		
		const secret = JWT_SECRET + user.pwd;
		try {
			const payload = jwt.verify(token, secret);

			//check for matching passwords - later

			console.log("Update Password");
			let newRec = {
				"username" : user.username,
				"pwd" : req.body.pwd,
				"pnum" : user.pnum,
				"email" : user.email
			};
			mydb.updateAccount(newRec, function(result){
				res.send(result);
			});

			//hash password - later
			user.pwd = pwd;
			res.send(user);
			
			//figure out how to send to login page
			
		} catch (error) {
			console.log(error.message);
			res.send(error.message);	
		}
	});
	//res.sendFile((path.join(__dirname,'..', 'login.html')));
	//res.sendFile("http://localhost:3000/login");
})

router.get('/login', (req, res) => {
	res.sendFile((path.join(__dirname,'..', 'login.html')));
})	



module.exports = router;