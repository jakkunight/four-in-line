import React, { useContext, useState, useEffect } from "react";
import UserContext from "./users/UserContext.js";
import SocketContext from "./sockets/SocketContext.js";

const InputMessage = () => {

	const { userdata, logout } = useContext(UserContext);
	const socket = useContext(SocketContext);
	const [ content, setContent ] = useState("");

	return (
		<div>
			<input type="text" value={content} onChange={(event) => {
				setContent(event.target.value);
			}} />
			<button onClick={(event) => {
				socket.emit("newMessage", {
					sender: userdata.name,
					content: content
				});
				//={
				setContent("");
			}} >
				{"Send"}
			</button>
			<br/>
			<button onClick={(event) => {
				logout(userdata.name, userdata.password);
			}} >
				{"Logout"}
			</button>
		</div>
	);
};

export default InputMessage;
