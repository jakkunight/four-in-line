import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext.js";

const User = ({ loginLink, logoutLink, children }) => {

	const [ userdata, setUserdata ] = useState("");

	const login = async (username, password) => {
		try{
			const credentials = new FormData();
			credentials.append("username", username);
			credentials.append("password", password);
			console.log(credentials.getAll("username"), credentials.getAll("password"));
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
			console.log("FETCH RESPONSE:", res);
			const data = await res.json();
			console.log("FETCH DATA:", data);
			setUserdata(data);
		}catch(error){
			console.error("[UserContext->login()] FATAL ERROR.");
			console.error(error);
			throw new Error(error);
		}
	};
	const logout = async (username, password) => {
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
			setUserdata("");
		}catch(error){
			console.error("[UserContext->login()] FATAL ERROR.");
			throw new Error(error);
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
