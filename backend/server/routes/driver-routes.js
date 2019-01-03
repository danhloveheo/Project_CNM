const express = require("express");
const router = express.Router();

const { Drivers } = require("./../utils/drivers");

let onlineDrivers = new Drivers();

module.exports = function(io) {
	//Socket.IO
	io.on("connection", function(socket) {
		let rider;

		socket.on("riderRequest", data => {
			rider = data;
			rider.socketId = socket.id;
			let availableDrivers = onlineDrivers.getDriverListByStatus("available");
			// TODO: Distance Matrix
			// Join các driver thoả dk vào room với tên = socket id của rider
			availableDrivers.forEach(driver => {
				// Lấy socket của driver từ socket id
				let driverSocket = io.sockets.connected[driver.socketId];
				// Join driver vào phòng tên = socketid của rider gửi request
				driverSocket.join(`${rider.socketId}`);
			});

			//Gửi request tới các driver trong phòng
			socket.to(`${rider.socketId}`).emit("newRequest", rider);
		});

		socket.on("driverRejected", data => {
			// Leave room có tên = socket id của rider
			socket.leave(`${data.rider.socketId}`, () => {
				// Tìm số driver còn lại trong phòng
				let room = io.sockets.adapter.rooms[`${data.rider.socketId}`];
				let remainDriver = room.length;

				// Nếu không còn driver nào trong phòng, emit lỗi cho rider
				if (remainDriver === 1) {
					io.to(`${data.rider.socketId}`).emit("noAvailable", {});
				}
			});
			// socketsId = io.sockets.adapter.rooms[`${data.rider.socketId}`].sockets;
			// console.log(socketsId);
		});

		socket.on("driverAccepted", data => {
			// Tìm tất cả socket trong phòng
			let socketsId = io.sockets.adapter.rooms[`${data.rider.socketId}`].sockets;

			for (let socketId in socketsId) {
				// Nếu socket không phải rider hay driver emit event...
				if (socketId !== data.rider.socketId && socketId !== socket.Id) {
					// ... thì thông báo request đã có người nhận
					io.to(`${socket}`).emit("requestTaken", {});

					// ...và xoá khỏi phòng
					let client = io.sockets.connected[socketId];
					client.leave(`${data.rider.socketId}`);
				}
			}

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
