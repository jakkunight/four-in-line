const mysql = require("mysql2");
//require('dotenv').config();
const { promisify } = require("util");


const db = mysql.createPool({
	database: "db_test",
	host: "127.0.0.1",
	user: "root",
	password: "",
});

/*
const db = mysql.createPool({
	database: "test",
	host: "i36l79tdjaxk.us-east-4.psdb.cloud",
	user: "poj6vpdtekt4",
	password: "pscale_pw_qdfrzh5qV6zEaZs6hQuTENrkmrTKCzm4a3szS4vTfWo"
});
*/
//const db = mysql.createPool(process.env.DATABASE_URL);

db.getConnection((error, connection) => {
	if(error){
		console.error("DATABASE NOT CONNECTED!!!");
		console.error(error);
	}else{
		console.log("DATABASE CONNECTED!!!");
	}
});

db.query = promisify(db.query);

module.exports = db;
