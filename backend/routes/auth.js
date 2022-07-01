const express = require("express");
const passport = require("passport");
const cors = require("cors");
const router = express.Router();
const users = require("../fakeData.js");

const cors_options = {
	optionsSuccessStatus: 200,
	origin: "http://localhost:3001",
	credentials: true,
	methods: [ "GET", "PUT", "DELETE", "OPTIONS", "HEAD", "POST" ],
};

router.get("/auth", cors(cors_options), async (req, res, next) => {
	let resp = {
		status: 0,
		http_code: 200,
		msg: "Logged in successfully. Welcome to the system."
	}
	if(req.user){
		res.json(JSON.stringify(users[req.user.id]));
	}else{
		resp = {
			status: -1,
			http_code: 400,
			msg: "Unauthorized request. Please login first."
		};
		res.json(JSON.stringify(resp));
	}
});
router.post("/auth/login", cors(cors_options), passport.authenticate("local", {
	successRedirect: "/auth",
	failureRedirect: "/auth"
}));

module.exports = router;
