import React, { Fragment, useState, useEffect, useContext } from "react";
import User from "./components/users/User.jsx";
import UserContext from "./components/users/UserContext.js";
import Socket from "./components/sockets/Socket.jsx";

const Tester = (props) => {
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const { userdata, login } = useContext(UserContext);

	const handlePasswordChange = (event) => {
		console.log(event.target.value);
		setPassword(event.target.value);
	};
	const handleUsernameChange = (event) => {
		console.log(event.target.value);
		setUsername(event.target.value);
	};
	const handleLogin = async (event) => {
		try{
			login(username, password);
		}catch(error){
			console.error(error);
			throw new Error(error);
		}
	};

	return (
		<>
			<h3>{"Login"}</h3>
			<input id="username" placeholder="Username" type="text" onChange={handleUsernameChange} autoFocus={true} />
			<input id="password" placeholder="Password" type="password" onChange={handlePasswordChange} />
			<button  onClick={handleLogin} >{"Login"}</button>
		</>
	);
};

const App = () => {

	return (
		<div bgcolor="#000000" width="100%" height="100%" >
			<User loginLink={"http://localhost:3000/auth/login"} logoutLink={"http://localhost:3000/auth/logout"} >
				{
					//<Socket link={"http://localhost:3000/"} >
				}
					<Tester />
				{
					//</Socket>
				}
			</User>
		</div>
	);
};

export default App;
