const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("./lib/passport.js");
const passport = require("passport");
const auth = require("./routes/auth.js");

// Setup:
const app = express();
const server = createServer(app);

// Middlewares:
app.use(cookieParser());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload());
app.use(session({
	secret: "my-secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(async (req, res, next) => {
	try{
		const datetime = new Date();
		console.log("\n------------------------------------------------------\n");
		console.log("[DATE] " + datetime.getDay() + "/" + datetime.getMonth() + "/" + datetime.getFullYear());
		console.log("[TIME] " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds() + ":" + 
		datetime.getMilliseconds());
		console.log("[" + req.method + "] " + req.protocol + "://" + req.headers.host + req.url);
		console.log("[CLIENT] " + req.headers.origin);
		console.log("[USER] " + JSON.stringify(req.user));
		console.log("[SESSION] " + JSON.stringify(req.session));
		console.log("[BODY] " + JSON.stringify(req.body));
		next();
	}catch(error){
		console.error("\n------------------------------------------------------\n");
		console.error(">--------(ERROR)--------<");
		console.error(error);
		console.error("\n")
		res.json(JSON.stringify({
			status: -1,
			http_code: 400,
			msg: "Bad Request."
		}));
	}
});

// Routes:
app.options("*", cors({
	optionsSuccessStatus: 200,
	origin: true,
	credentials: true,
	methods: [ "GET", "PUT", "DELETE", "OPTIONS", "HEAD", "POST" ],
}));
app.use(auth);

module.exports = server;
