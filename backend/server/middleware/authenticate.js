const jwt = require("jsonwebtoken");

function authenticateIdToken(req, res, next) {
	const idToken = req.header("x-auth");

	if (idToken) {
		jwt.verify(idToken, process.env.JWT_ID_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					error: true,
					message: err.message
				});
			}

			req.decoded = decoded;
			next();
		});
	} else {
		return res.status(401).send({
			error: true,
			message: "No token provided"
		});
	}
}

module.exports = { authenticateIdToken };