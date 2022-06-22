const bcryptjs = require("bcryptjs");

const bcrypt = {};
bcrypt.hash_text = async (text) => {
	try{
		const salt = await bcryptjs.genSalt(10);
		const hash = await bcryptjs.hash(text, salt);
		return hash;
	}catch(error){
		console.error("[BCRYPT -> hash_text()] FATAL ERROR!!!");
		console.error(error);
		return -1;
	}
};
bcrypt.compare_hash = async (text, hash) => {
	try{
		const result = await bcryptjs.compare(text, hash);
		if(result){
			return 0;
		}else{
			return 1;
		}
	}catch(error){
		console.error("[BCRYPT -> compare_hash()] FATAL ERROR!!!");
		console.error(error);
		return -1;
	}
};

module.exports = bcrypt;

