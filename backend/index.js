const server = require("./server.js");

server.listen(process.env.PORT || 3000, () => {
	console.log("[SERVER] Server on port", process.env.PORT || 3000);
});
