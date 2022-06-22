const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { sql_id, sql_name } = require("../schemas.js");
const bcrypt = require("./bcrypt.js");
const CRUD = require("./crud.js");
const db = require("./db.js");

passport.use(new LocalStrategy(async (username, password, done) => {
	// Verify user credentials:
	try{
		const password_hash = await db.query("SELECT password FROM users WHERE user = ?", [sql_name.parse(username)]);
	}catch(error){
		console.error("[PASSPORT->use->LocalStrategy->verify()] FATAL ERROR!!!");
		return 
	}
}));

passport.serializeUser((user, done) => {
	// Get the user id:
	done(null, USER_ID);
});

passport.deserializeUser(async (id, done) => {
	// Get the user data by its id:
	done(null, USER_DATA);
});
