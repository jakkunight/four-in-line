import React, { Fragment, useState, useEffect, useContext } from "react";
import UserContext from "./users/UserContext.js";
import Router from "./navigator/Router.js";

const Login = () => {

	const { login, userdata } = useContext(UserContext);
	const { navigateToScreen, activeScreen } = useContext(Router);
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");

	useEffect(() => {
		if(userdata){
			console.log("Navigating to screen 1...");
			navigateToScreen(1);
			console.log("activeScreen =", activeScreen);
		}
	});

	return (
		<center style={{
			width: "100%",
			height: "100%",
		}}>
			<h3>
				{"Login"}
			</h3>
			<p>
				{"Username:"}
			</p>
			<input type="text" value={username} onChange={(event) => {
				setUsername(event.target.value);
			}} autoFocus={true} />
			<p>
				{"Password:"}
			</p>
			<input type="password" value={password} onChange={(event) => {
				setPassword(event.target.value);
			}} />
			<br/>
			<button onClick={(event) => {
				login(username, password)
				setUsername("");
				setPassword("");
			}} >
				{"Login"}
			</button>
		</center>
	);
};

export default Login;
