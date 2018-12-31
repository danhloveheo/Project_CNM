var express = require("express");
var router = express.Router();

module.exports = function(io) {
	//Socket.IO
	io.on("connection", function(socket) {
		console.log("New client connect!", socket.id);

		socket.on("riderRequest", data => {
			console.log("New rider request", socket.id);
		});
	});
	return router;
};
