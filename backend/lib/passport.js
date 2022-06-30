const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const users = require("../fakeData.js");
//const { sql_id, sql_name } = require("../schemas.js");
//const bcrypt = require("./bcrypt.js");
//const CRUD = require("./crud.js");
//const db = require("./db.js");

passport.use(new LocalStrategy(async (username, password, done) => {
	// Verify user credentials:
	try{
		console.log("[PASSPORT->use->LocalStrategy->verify()] USER CREDENTIALS:");
		console.log("username:", username);
		console.log("password:", password);
		//const password_hash = await db.query("SELECT password FROM users WHERE user = ?", [sql_name.parse(username)]);
		for(let i = 0; i < users.length; i++){
			if(users[i].name === username && users[i].password === password){
				console.log("[PASSPORT->use->LocalStrategy->verify()] Successfully logged in!");
				return done(null, users[i]);
			}
		}
		console.log("[PASSPORT->use->LocalStrategy->verify()] Failed to login. Please make sure that your credentials are correct and try again.");
		return done(null, false);
	}catch(error){
		console.error("[PASSPORT->use->LocalStrategy->verify()] FATAL ERROR!!!");
		return done(error, false);
	}
}));

passport.serializeUser((user, done) => {
	// Get the user id:
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	// Get the user data by its id:
	done(null, users[id]);
});
