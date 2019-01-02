const express = require("express");
const router = express.Router();

const { Drivers } = require("./../utils/drivers");

let onlineDrivers = new Drivers();

module.exports = function(io) {
	//Socket.IO
	io.on("connection", function(socket) {
		let rider;

		socket.on("riderRequest", data => {
			// console.log("New rider request", socket.id);
			let isAccepted = false;
			rider = data;
			rider.socketId = socket.id;
			let availableDrivers = onlineDrivers.getDriverListByStatus("available");
			// console.log(availableDrivers);
			// TODO: Distance Matrix
			// Join các driver thoả dk vào room với tên = socket id của rider
			availableDrivers.forEach(driver => {
				// Lấy socket của driver từ socket id
				let driverSocket = io.sockets.connected[driver.socketId];
				// console.log(driverSocket.id);
				// console.log(`${rider.socketId}`);
				// Join driver vào phòng tên = socketid của rider gửi request
				driverSocket.join(`${rider.socketId}`);
			});
			socket.to(`${rider.socketId}`).emit("newRequest", rider);
			// console.log(io.sockets.adapter.rooms[`${rider.socketId}`]);
		});

		socket.on("driverRejected", data => {
			// Leave room có tên = socket id của rider
			socket.leave(`${data.rider.socketId}`, () => {
				// Tìm số driver còn lại trong phòng
				let room = io.sockets.adapter.room[`${rider.socketId}`];
				let remainDriver = room.length;

				// Nếu không còn driver nào trong phòng, emit lỗi cho rider
				if (remainDriver === 0) {
					io.to(`${data.rider.socketId}`).emit("noAvailable", {});
				}
			});
		});

		socket.on("driverAccepted", data => {
			// Tìm tất cả socket trong phòng
			let roster = io.sockets.clients(`${data.rider.socketId}`);

			roster.forEach(client => {
				// Nếu socket không phải rider hay driver emit event...
				if (client.id !== data.rider.socketId && client.id !== socket.id) {
					// ... thì thông báo request đã có người nhận
					io.to(`${client.id}`).emit("requestTaken", {});
					// ...và xoá khỏi phòng
					client.leave(`${data.rider.socketId}`);
				}
			});

			// Thông báo cho rider thông tin của driver
			socket.to(`${data.rider.socketId}`).emit("requestAccepted", data);
		});

		socket.on("driverInit", data => {
			onlineDrivers.addDriver(socket.id, data.curPosition);
			// console.log(onlineDrivers.drivers);
		});

		socket.on("driverBusy", () => {
			onlineDrivers.updateDriverStatus(socket.id, "busy");
			// console.log(onlineDrivers.drivers);
		});
		socket.on("driverAvailable", () => {
			onlineDrivers.updateDriverStatus(socket.id, "available");
			// console.log(onlineDrivers.drivers);
		});
		socket.on("disconnect", data => {
			onlineDrivers.removeDriver(socket.id);
			// console.log(onlineDrivers.drivers);
		});
	});
	return router;
};
