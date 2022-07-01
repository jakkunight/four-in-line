import React, { useContext, useState, useEffect } from "react";
import SocketContext from "./sockets/SocketContext.js";

const Chat = () => {

	const socket = useContext(SocketContext);
	const [ chat, setChat ] = useState([]);

	useEffect(() => {
		socket.on("new message", (message) => {
			setChat([...chat, message]);
		});
	});

	return (
		<ul>
			{
				chat.map((message) => {
					return (
						<li>
							{message.sender + ": " + message.content}
						</li>
					);
				})
			}
		</ul>
	);
};

export default Chat;
