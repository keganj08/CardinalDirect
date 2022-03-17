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


/* This Snippet WORKS
mariadb.createConnection(configObj)
    .then(conn => {
      conn.query("select 1", [2])
        .then(rows => {
          console.log(rows); // [{ "1": 1 }]
          conn.end();
        })
        .catch(err => { 
          console.log("query error: " + err);
        });
    })
    .catch(err => {
      console.log("connection error: " + err);
    });
*/