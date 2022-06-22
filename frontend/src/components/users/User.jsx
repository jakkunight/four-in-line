import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext.js";

const User = ({ link, children }) => {

	const data = {};

	return (
		<UserContext.Provider value={data} >
			{children}
		</UserContext.Provider>
	);
};

export default User;
