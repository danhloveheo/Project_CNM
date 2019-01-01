class Drivers {
	constructor() {
		this.drivers = [];
	}

	addDriver(socketId, curPosition) {
		let driver = { socketId, curPosition, status: "available" };
		this.drivers.push(driver);
		return driver;
	}

	removeDriver(socketId) {
		let driver = this.getDriver(socketId);

		if (driver) {
			this.drivers = this.drivers.filters(driver => driver.socketId !== socketId);
		}

		return driver;
	}

	getDriver(socketId) {
		return this.drivers.filters(driver => driver.socketId === socketId)[0];
	}

	updateDriverPosition(socketId, newPosition) {
		let driver = getDriver(socketId);
		driver.curPosition = newPosition;

		return driver;
	}

	updateDriverStatus(socketId, status) {
		let driver = getDriver(socketId);
		driver.status = status;

		return driver;
	}

	getDriverListByStatus(status) {
		let drivers = this.drivers.filters(driver => driver.status === status);
		return drivers;
	}
}
