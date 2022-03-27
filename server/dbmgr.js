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

// Searches the course table for classes given search parameters
exports.searchForClasses = function(searchAttrs, searchVals, callbackFn){
	let searchClause = "";
	let i=0;
	searchClause = searchAttrs[0] + " = " + searchVals[0];
	for (i=1; i<searchAttrs.length; i++){
		let searchAdd = " AND " + searchAttrs[i] + " = " + searchVals[i];
		searchClause += searchAdd;
	}
	
	mariadb.createConnection(configObj)
		.then(conn => {
			conn.query("SELECT c.cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast\
						FROM course c JOIN courseFaculty f on c.cid = f.cid WHERE ?", [searchClause])
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
			/*
			UPDATE Customers
			SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
			WHERE CustomerID = 1;
			*/
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