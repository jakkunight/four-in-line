import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext.js";

const Socket = ({ link, children }) => {

	const socket = io(link);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected to", link, "as", socket.id);
		});
		return () => {
			socket.on("disconnect", () => {
				console.log("Disconnected from", link);
			});
		};
	}, []);

	const data = {
		socket
	};

	return (
		<SocketContext.Provider value={data} >
			{children}
		</SocketContext.Provider>
	);
};

export default Socket;
