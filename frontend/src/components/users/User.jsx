import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext.js";

const User = ({ loginLink, logoutLink, children }) => {

	const [ userdata, setUserdata ] = useState(false);

	const login = async (username, password) => {
		console.log("[login] Logging in...");
		try{
			const credentials = new FormData();
			credentials.append("username", username);
			credentials.append("password", password);
			const res = await fetch(loginLink, {
				method: "POST",
				mode: "cors",
				redirect: "follow",
				credentials: "include",
				headers: {
					//'Content-Type': "multipart/form-data",
					'Access-Control-Allow-Origin': "http://localhost:3001",
					'Access-Control-Allow-Credentials': 'true'
				},
				body: credentials
			});
			const data = await res.json();
			const user = await JSON.parse(data);
			if(user.status){
				console.log("[login] Failed to log in.");
				console.log("\t{status}", user.status);
				console.log("\t{http_code}", user.http_code);
				console.log("\t{msg}", user.msg);
				alert(user.msg);
				return 1;
			}else{
				console.log("[login] Successfully logged in");
				setUserdata(user);
				return 0;
			}
		}catch(error){
			console.error("[login] FATAL ERROR.");
			console.error(error);
			return -1;
		}
	};
	const logout = async (username, password) => {
		console.log("[logout] Logging out...");
		try{
			const credentials = new FormData();
			credentials.append("username", username);
			credentials.append("password", password);
			const response = await fetch(logoutLink, {
				method: "POST",
				mode: "cors",
				redirect: "follow",
				credentials: "include",
				headers: {
					"Access-Control-Allow-Origin": "http://localhost:3001/",
					"Access-Control-Allow-Credentials": "true"
				},
				body: credentials
			});
			const res = await response.json();
			const data = await JSON.parse(res);
			if(data.status === 0){
				console.log("[logout] Successfully logged out.");
				setUserdata(false);
				return 0;
			}else{
				console.log("[logout] Failed to logout.");
				console.log("\t{status}", data.status);
				console.log("\t{http_code}", data.http_code);
				console.log("\t{msg}", data.msg);
				alert(data.msg);
				return 1;
			}
		}catch(error){
			console.error("[UserContext->logout()] FATAL ERROR.");
			console.error(error);
			return -1;
		}
	};

	const data = {
		userdata,
		login,
		logout
	};

	return (
		<UserContext.Provider value={data} >
			{children}
		</UserContext.Provider>
	);
};

export default User;
