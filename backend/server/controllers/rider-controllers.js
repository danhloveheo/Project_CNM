const _ = require("lodash");
const googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyCp3QauVfDwqyT7kwndhlTi-ot6kwAu_2E",
	Promise: Promise
});

function calPrice(req, res) {
	let body = _.pick(req.body, ["curPosition", "desPosition"]);

	if (body.curPosition && body.desPosition) {
		// do something
	} else {
		res.status(400).send({
			error: true,
			message: "Not enough data. Please check curPosition and desPosition"
		});
	}
}

module.exports = { calPrice };
