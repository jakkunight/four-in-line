const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("./lib/passport.js");
const passport = require("passport");
const { Server } = require("socket.io");
const auth = require("./routes/auth.js");

// Setup:
const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3001",
		credentials: true,
	}
});

// Middlewares:
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
		const datetime = new Date();
		console.log("\n------------------------------------------------------\n");
		console.log("[DATE] " + datetime.getDay() + "/" + datetime.getMonth() + "/" + datetime.getFullYear());
		console.log("[TIME] " + datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds() + ":" + 
		datetime.getMilliseconds());
		console.log("[" + req.method + "] " + req.protocol + "://" + req.headers.host + req.url);
		console.log("[CLIENT] " + req.headers.origin);
		console.log("[USER] " + req.user);
		console.log("[SESSION] " + req.session);
		console.log("[BODY] " + req.body);
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
	origin: "http://localhost:3001",
	credentials: true,
	methods: [ "GET", "PUT", "DELETE", "OPTIONS", "HEAD", "POST" ],
}));
app.use(auth);

// SocketIO:

const wrapper = (fn) => (socket, next) => fn(socket.request, {}, next);

io.use(wrapper(fileupload()));
io.use(wrapper(cookieParser()));
io.use(wrapper(sessionMiddleware));
io.use(wrapper(passport.initialize()));
io.use(wrapper(passport.session()));
io.use((socket, next) => {
	console.log("\n---------------------------------------------------\n");
	console.log("[SOCKET] ID:", socket.id);
	console.log("[SOCKET] User:",socket.request.user);
	if(socket.request.user){
		console.log("[SOCKET] Authorized connection. Accessing...");
		next();
	}else{
		console.error("[SOCKET] Unauthorized connection. Rejecting...");
		next(new Error("Unauthorized connection."));
	}
});

io.on("connection", (socket) => {
	console.log("Hello, " + socket.id + "!");
	const session = socket.request.session;
	console.log("saving sid " + socket.id + " in session " + session.id);
	session.socketId = socket.id;
	session.save();

	socket.on("newMessage", (message) => {
		console.log("Session.socketId:", socket.request.session.socketId);
		io.emit("new message", message);
	});
});

app.post("/auth/logout", cors({
	optionsSuccessStatus: 200,
	origin: "http://localhost:3001",
	credentials: true,
	methods: [ "GET", "PUT", "DELETE", "OPTIONS", "HEAD", "POST" ],
}), async (req, res) => {
	try{
		io.of("/").sockets.get(req.session.socketId).disconnect(true);
		req.logout(() => {});
		res.cookie("connect.sid", "", { expires: new Date() });

		const resp = {
			status: 0,
			http_code: 200,
			msg: "Successfully logged out."
		};
		res.json(JSON.stringify(resp));
	}catch(error){
		console.error("FATAL ERROR!!!");
		console.error(error);
		const resp = {
			status: -1,
			http_code: 400,
			msg: "Failed to logout."
		};
		res.json(JSON.stringify(resp));
	}
});

server.listen(process.env.PORT || 3000, () => {
	console.log("[SERVER] Server on port", process.env.PORT || 3000);
});
