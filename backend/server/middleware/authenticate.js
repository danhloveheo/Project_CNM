const jwt = require("jsonwebtoken");

// Hàm kiểm tra tính hợp lệ của idToken
function authenticateIdToken(req, res, next) {
	// Lấy giá trị của idToken lưu trong header "x-auth" của request
	const idToken = req.header("x-auth");

	if (idToken) {
		// Kiểm tra tính hợp lệ của idToken
		jwt.verify(idToken, process.env.JWT_ID_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					error: true,
					message: err.message
				});
			}

			// Thêm property decode lưu giá trị đã decode(email và role) của idToken vào request
			req.decoded = decoded;
			// Tiếp tục xử lý request
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
