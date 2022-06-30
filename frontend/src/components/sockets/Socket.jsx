import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext.js";

const Socket = ({ link, children }) => {

	const socket = io(link, {
		autoConnect: false,
		withCredentials: true,
	});

	return (
		<SocketContext.Provider value={socket} >
			{children}
		</SocketContext.Provider>
	);
};

export default Socket;
