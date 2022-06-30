import React, { useState } from "react";
import Router from "./Router.js";

const Navigator = ({ homeScreen, children }) => {

	const [ activeScreen, setActiveScreen ] = useState(homeScreen);

	const navigateToScreen = async (screenId) => {
		setActiveScreen(screenId);
	};

	const contextData = {
		activeScreen,
		navigateToScreen
	};

	return (
		<Router.Provider value={contextData} >
			{children}
		</Router.Provider>
	);
};

export default Navigator;
