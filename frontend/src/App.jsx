import React, { Fragment } from "react";
import Socket from "./components/sockets/Socket.jsx";

const App = () => {

	return (
		<Socket link={"http://localhost:3000"} >
			<h1>
				{"Hello Vite + React.js!"}
			</h1>
			<p>
				{"React.js is in version 18 now, so my knowlage about v17 is outdated :("}
			</p>
		</Socket>
	);
};

export default App;
