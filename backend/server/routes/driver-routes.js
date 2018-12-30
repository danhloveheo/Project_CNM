var express = require("express");
var router = express.Router();

module.exports = function(io) {
	//Socket.IO
	io.on("connection", function(socket) {
		console.log("New user connected");
		socket.on("riderRequest", data => {
			console.log(data);
		});
	});
	return router;
};
