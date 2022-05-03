const mariadb = require('mariadb');

// Load connection configurations
const config = require('./config.json');


const configObj = {
	user: config.user,
	password: config.password,
	host: config.host,
	port: config.port,
	database: config.database
};

/* -----------------------------------User------------------------------------*/

// Adds a record to the user table.
exports.addUser = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = record.email;
			let username = record.username;
			let pwd = record.pwd;
			let pnum = record.pnum;
			conn.query("INSERT INTO user value (?, ?, ?, ?, ?)", [email, username, pwd, pnum, null])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(email);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Searches the user table for any record with the matching user email
exports.findUserRecByEmail = function(keyval, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			conn.query("SELECT * FROM user WHERE email = ?", [keyval])
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

/* ----------------------------Courses/Enrollments-----------------------------*/

// Searches the course table for classes given search parameters
exports.searchForClasses = function(searchAttrs, searchVals, callbackFn){
	let searchClause = "";
	
	// If a search parameter is subc.cid, set wildcards _ and %
	let cidIdx = searchAttrs.indexOf("subc.cid");
	if(cidIdx !== -1){
		let cidInput = searchVals[cidIdx];
		let dept = cidInput.substr(0, 4); // "CSCE" of "CSCE 494"
		let num = cidInput.substr(-3); // "494" of "CSCE 494"
		searchVals[cidIdx] = dept + '_' + num + '%'; // "CSCE_494%"
	}
	// Construct the search WHERE clause
	// Note that if the attribute is cid, we need the LIKE operator and = otherwise
	let i=0;
	if(searchAttrs[0] === "subc.cid"){
		searchClause = searchAttrs[0] + " LIKE " + "(?)";
	}
	else{
		searchClause = searchAttrs[0] + " = " + "(?)";
	}
	for (i=1; i<searchAttrs.length; i++){
		let searchAdd = "";
		if(searchAttrs[i] === "subc.cid"){
			searchAdd = " AND " + searchAttrs[i] + " LIKE " + "(?)";
		}
		else{
			searchAdd = " AND " + searchAttrs[i] + " = " + "(?)";
		}
		searchClause += searchAdd;
	}
	// Search Query
	let query = "SELECT c.cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast\
				FROM course c JOIN courseFaculty f ON c.cid = f.cid\
				WHERE c.cid IN\
				(SELECT subc.cid\
				FROM course subc JOIN courseFaculty subf ON subc.cid = subf.cid\
				WHERE " + searchClause + ")";
	mariadb.createConnection(configObj)
		.then(conn => {
			conn.query(query, searchVals)
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Finds all classes a given user is enrolled in by email
exports.findClassesByEmail = function(keyval, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = keyval.email;
			conn.query("SELECT c.cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast \
						FROM course c JOIN courseFaculty f ON c.cid = f.cid \
						WHERE c.cid IN (SELECT cid FROM enroll WHERE email = ?)", email)
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds an enrollment record to the enroll table
exports.addEnroll = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = record.email;
			let cid = record.cid;
			conn.query("INSERT INTO enroll value (?, ?)", [email, cid])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Removes an enrollment record from the enroll table
exports.deleteEnroll = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = record.email;
			let cid = record.cid;
			conn.query("DELETE FROM enroll WHERE email = (?) AND cid = (?)", [email, cid])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};


/* ----------------------------Assignments---------------------------*/

// Finds all assignments created by a given user by email and date
exports.findAssignmentsByEmailAndDate = function(searchRec, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = searchRec.email;
			let dueDate = searchRec.dueDate;
			conn.query("SELECT * FROM assignment WHERE email = (?) and dueDate = (?)", [email, dueDate])
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds an assignment to the assignment table
exports.addAssignment = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let title = record.title;
			let dueDate = record.dueDate;
			let dueTime = record.dueTime;
			let email = record.email;
			let cid = record.cid;
			conn.query("INSERT INTO assignment value (?, ?, ?, ?, ?, ?)", [null, title, dueDate, dueTime, email, cid])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res.insertId);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Updates an assignment already in the assignment table
exports.updateAssignment = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let title = record.title;
			let dueDate = record.dueDate;
			let dueTime = record.dueTime;
			let cid = record.cid;
			let aid = record.id;
			
			conn.query("UPDATE assignment SET title = (?), dueDate = (?), dueTime = (?), cid = (?) \
						WHERE aid = (?)", [title, dueDate, dueTime, cid, aid])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Deletes an assignment from the assignment table
exports.deleteAssignment = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let id = record.id;
			conn.query("DELETE FROM assignment WHERE aid = (?)", [id])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

/* --------------------------------Meetings--------------------------------*/
// Finds all meetings created by a given user by email and date
exports.findMeetingsByEmailAndDate = function(searchRec, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = searchRec.email;
			let meetDate = searchRec.meetDate;
			conn.query("SELECT * FROM meeting WHERE email = (?) and meetDate = (?)", [email, meetDate])
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds a meeting to the meeting table
exports.addMeeting = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let title = record.title;
			let building = record.building;
			let roomNum = record.roomNum;
			let start = record.start;
			let end = record.end;
			let meetDate = record.meetDate;
			let email = record.email;
			conn.query("INSERT INTO meeting value (?, ?, ?, ?, ?, ?, ?, ?)", [null, title, building, roomNum, start, end, meetDate, email])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res.insertId);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Updates a meeting already in the meeting table
exports.updateMeeting = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let title = record.title;
			let building = record.building;
			let roomNum = record.roomNum;
			let start = record.start;
			let end = record.end;
			let meetDate = record.meetDate;
			let mid = record.id;
			
			conn.query("UPDATE meeting SET title = (?), building = (?), roomNum = (?), start = (?), \
						end = (?), meetDate = (?) \
						WHERE mid = (?)", [title, building, roomNum, start, end, meetDate, mid])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Deletes a meeting from the meeting table
exports.deleteMeeting = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let id = record.id;
			conn.query("DELETE FROM meeting WHERE mid = (?)", [id])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};


/* -----------------------------------To-Do--------------------------------*/
// Finds all to-do list items created by a given user by email and date
exports.findToDoListByEmailAndDate = function(searchRec, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = searchRec.email;
			let listDate = searchRec.listDate;
			conn.query("SELECT td.tid, listDate, description, isComplete, email \
						FROM todo td JOIN todoItem tdi ON td.tid = tdi.tid \
						WHERE email = (?) and listDate = (?)", [email, listDate])
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds a to-do list to the todo table
exports.addToDoList = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let listDate = record.listDate;
			let email = record.email;
			conn.query("INSERT INTO todo value (?, ?, ?)", [null, listDate, email])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res.insertId);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Updates a to-do list already in the todo table
exports.updateToDoList = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let listDate = record.listDate;
			let tid = record.id;
			
			conn.query("UPDATE todo SET listDate = (?) WHERE tid = (?)", [listDate, tid])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Deletes a to-do list from the todo table
exports.deleteToDoList = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let id = record.id;
			conn.query("DELETE FROM todo WHERE tid = (?)", [id])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds a to-do list item to the todoItem table
exports.addToDoListItem = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let tid = record.tid;
			let description = record.description;
			let isComplete = record.isComplete;
			conn.query("INSERT INTO todoItem value (?, ?, ?)", [tid, description, isComplete])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res.insertId);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Updates a to-do list item already in the todoItem table
exports.updateToDoListItem = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let tid = record.tid;
			let description = record.description;
			let isComplete = record.isComplete;
			
			conn.query("UPDATE todoItem SET isComplete = (?) \
						WHERE tid = (?) and description = (?)", [isComplete, tid, description])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Deletes a to-do list item from the todoItem table
exports.deleteToDoListItem = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let tid = record.tid;
			let description = record.description;
			conn.query("DELETE FROM todoItem WHERE tid = (?) AND description = (?)", [tid, description])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

/* -----------------------------------Notes--------------------------------*/

// Finds all notes created by a given user by email
exports.findNotesByEmail = function(keyval, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let email = keyval.email;
			conn.query("SELECT * FROM note WHERE email = ?", [email])
				.then(res => {
					//console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
				callbackFn(null);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Adds a note to the note table
exports.addNote = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let noteTitle = record.noteTitle;
			let noteText = record.noteText;
			let email = record.email;
			conn.query("INSERT INTO note value (?, ?, ?, ?)", [null, noteTitle, noteText, email])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res.insertId);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Updates a note already in the note table
exports.updateNote = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let noteTitle = record.noteTitle;
			let noteText = record.noteText;
			let id = record.id;
			
			conn.query("UPDATE note SET title = (?), text = (?) WHERE nid = (?)", [noteTitle, noteText, id])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

// Deletes a note from the note table
exports.deleteNote = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let id = record.id;
			conn.query("DELETE FROM note WHERE nid = (?)", [id])
				.then(res => {
					console.log(res);
					conn.end();
					//callbackFn(res);
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

/* -----------------------------------Settings--------------------------------*/
// Updates a user's information already in the user database
exports.updateAccount = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let username = record.username;
			let pwd = record.pwd;
			let pnum = record.pnum;
			let email = record.email;
			conn.query("UPDATE user SET username = (?), pwd = (?), pnum = (?) WHERE email = (?)", [username, pwd, pnum, email])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn();
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};

exports.updateNotifications = function(record, callbackFn){
	mariadb.createConnection(configObj)
		.then(conn => {
			let notifyType = record.notifyType;
			let email = record.email;
			conn.query("UPDATE user SET notifyType = (?) WHERE email = (?)", [notifyType, email])
			//conn.query("INSERT INTO user value (?, ?)", [notifyType, email])
				.then(res => {
					console.log(res);
					conn.end();
					callbackFn(res);
				})
			.catch(err => { 
				console.log("query error: " + err);
			});
		})
		.catch(err => {
			console.log("connection error: " + err);
		});
};


