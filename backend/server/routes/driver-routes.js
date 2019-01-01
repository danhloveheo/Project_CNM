var express = require("express");
var router = express.Router();

module.exports = function(io) {
	//Socket.IO
	io.on("connection", function(socket) {
		console.log("New client connect!", socket.id);

		socket.on("riderRequest", data => {
			console.log("New rider request", socket.id);
		});
		socket.on("driverInit", data => {
			console.log("New driver online", socket.id);
		});
		socket.on("driverBusy", () => {
			console.log("Driver status changed to busy", socket.id);
		});
		socket.on("driverAvailable", () => {
			console.log("Driver status changed to available", socket.id);
		});
		socket.on("disconnect", data => {
			console.log("Client disconnected", socket.id);
		});
	});
	return router;
};