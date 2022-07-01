import React, { useContext, useState, useEffect } from "react";
import Router from "./Router.js";
import ScreenContext from "./ScreenContext.js";

const Screen = ({ id, next, prev, children }) => {
	const {
		navigateToScreen,
		activeScreen
	} = useContext(Router);
	const [ visible, setVisible ] = useState(false);

	useEffect(() => {
		if(id === activeScreen){
			setVisible(true);
		}else{
			setVisible(false);
		}
	});

	const navigateToNextScreen = async () => {
		navigateToScreen(next);
	};
	const navigateToPrevScreen = async () => {
		navigateToScreen(prev);
	};

	const data = {
		navigateToScreen,
		navigateToNextScreen,
		navigateToPrevScreen
	};

	if(!visible){
		return (
			<div>
			</div>
		);
	}else{
		return (
			<ScreenContext.Provider value={data} >
				{children}
			</ScreenContext.Provider>
		);
	}
};

export default Screen;
export {
	ScreenContext
};

