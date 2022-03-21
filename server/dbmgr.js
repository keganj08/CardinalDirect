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