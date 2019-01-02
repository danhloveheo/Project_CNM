class Drivers {
	constructor() {
		this.drivers = [];
	}

	addDriver(socketId, curPosition) {
		let driver = this.getDriver(socketId);

		//Nếu driver đã connect từ trước
		if (driver) {
			//update lại vị trí hiện tại
			driver.curPosition = curPosition;
		} else {
			driver = { socketId, curPosition, status: "available" };
			this.drivers.push(driver);
		}

		return driver;
	}

	removeDriver(socketId) {
		let driver = this.getDriver(socketId);

		if (driver) {
			this.drivers = this.drivers.filter(driver => driver.socketId !== socketId);
		}

		return driver;
	}

	getDriver(socketId) {
		return this.drivers.filter(driver => driver.socketId === socketId)[0];
	}

	updateDriverPosition(socketId, newPosition) {
		let driver = this.getDriver(socketId);
		driver.curPosition = newPosition;

		return driver;
	}

	updateDriverStatus(socketId, status) {
		let driver = this.getDriver(socketId);
		driver.status = status;

		return driver;
	}

	getDriverListByStatus(status) {
		let drivers = this.drivers.filter(driver => driver.status === status);
		return drivers;
	}
}

module.exports = { Drivers };
