import React, { useContext, useState, useEffect } from "react";
import UserContext from "./users/UserContext.js";
import SocketContext from "./sockets/SocketContext.js";

const InputMessage = () => {

	const { userdata } = useContext(UserContext);
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
				setContent("");
			}} >
				{"Send"}
			</button>
		</div>
	);
};

export default InputMessage;
