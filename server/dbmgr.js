const mariadb = require('mariadb');

// Load connection configurations
const config = require('./config.json');
const pool = mariadb.createPool({
     user: config.user,
	 password: config.password,
     host: config.host,
	 port: config.port,
     database: config.database
});


exports.addUser = function(record){
	let conn;
	try {
		let email = record.email;
		let username = record.username;
		let pwd = record.pwd;
		let pnum = record.pnum;
		conn = pool.getConnection();
		const res = conn.query("INSERT INTO user value (?, ?, ?, ?, ?)", [email, username, pwd, pnum, null]);
		console.log(res);
	} catch (err) {
		throw err;
	} finally {
		if (conn){
			console.log(conn);
			conn.end();
			return;
		}
	}
};

/*
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}
*/