const express = require("express");
const fileupload = require("express-fileupload");
const session = require("express-session");
const passport = require("passport");
const { Server } = require("socket.io");

const app = express();

// Setup:
app.set("port", process.env.PORT || 3000);

// Middleware wraper for Socket.io:
const middleware = (fn) => {
	return (socket, next) => fn(socket.request, {}, next);
};

// Express Middlewares:
app.use(fileupload());
const sessionMiddleware = session({
	secret: "my-secret",
	resave: false,
	saveUninitialized: false
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(async (req, res, next) => {
	try{
		console.log("[" + await req.protocol.toUpperCase() + "]", await req.method + "://localhost:" + await app.get("port") + 
		await req.url, "from", await req.ip);
		next();
	}catch(error){
		console.error();
		next();
	}
});

// Routes:


// Startup:
const server = app.listen(app.get("port"), () => {
	console.log("Server on port", app.get("port"));
});

// Socket.IO Startup:
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3001"
	}
});
// Socket.io Middlewares:
//io.use(middleware());

io.on("connection", (socket) => {
	console.log("Hello,", socket.id + "!");
});
