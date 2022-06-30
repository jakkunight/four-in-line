import React, { Fragment, useState, useEffect, useContext } from "react";
import User from "./components/users/User.jsx";
import Socket from "./components/sockets/Socket.jsx";
import Navigator from "./components/navigator/Navigator.jsx";
import Screen from "./components/navigator/Screen.jsx";
import Login from "./components/Login.jsx";
import Chat from "./components/Chat.jsx";
import InputMessage from "./components/InputMessage.jsx";

const App = () => {

	return (
		<div bgcolor="#000000" width="100%" height="100%" >
			<Socket link={"http://localhost:3000/"} >
				<User loginLink={"http://localhost:3000/auth/login"} logoutLink={"http://localhost:3000/auth/logout"} >
					<Navigator homeScreen={0} >
						<Screen id={0} next={1} prev={0} >
							<Login />
						</Screen>
						<Screen id={1} next={1} prev={0} >
							<Chat />
							<InputMessage />
						</Screen>
					</Navigator>
				</User>
			</Socket>
		</div>
	);
};

export default App;
