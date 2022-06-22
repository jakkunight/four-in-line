import React, { useState, useEffect, Children } from "react";
import Router from "./Router.js";

const Navigator = ({ homeScreen, children }) => {
	// children = [ Comp1, Comp2, Com3, ..., CompN ];
	const screenNumber = (Children.toArray(children)).length;

	const [ activeScreen, setActiveScreen ] = useState(homeScreen);

	const loadActive = async () => {
		let tmpActive = [];
		for(let i = 0; i < screenNumber; i++){
			tmpActive.push(false);
		}
		tmpActive[activeScreen] = true;
		return tmpActive;
	};

	const [ active, setActive ] = useState(loadActive());

	const navigateToScreen = async (screenId) => {
		let tmpActive = active;
		tmpActive[activeScreen] = false;
		tmpActive[screenId] = true;
		setActive(tmpActive);
		setActiveScreen(screenId);
	};

	useEffect(() => {
        setActive(loadActive());
        console.log("Navigator Screens:", screens);
    }, [activeScreen]);

	const contextData = {
		activeScreen,
		active,
		navigateToScreen
	};

	return (
		<Router.Provider value={contextData} >
			{children}
		</Router.Provider>
	);
};

export default Navigator;
