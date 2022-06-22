import React, { useContext, useState } from "react";
import Router from "./Router.js";
import ScreenContext from "./ScreenContext.js";

const Screen = ({ id, next, prev, children }) => {
	const {
		active,
		navigateToScreen,
		activeScreen
	} = useContext(Router);
	const [ visible, setVisible ] = useState(false);

	useEffect(() => {
		setVaisible(active[id]);
	}, []);

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
			<ScreenContext.Provider value={data} >
			</ScreenContext.Provider>
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
