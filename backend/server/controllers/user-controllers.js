const _ = require("lodash");

const { mongoose } = require("./../db/mongoose");
const { User } = require("./../models/user");

// Hàm dùng trong route /user/register
function register(req, res) {
	// Lấy các properties cần thiết trong request
	let body = _.pick(req.body, ["firstName", "lastName", "email", "password", "role"]);
	let user = new User(body);

	// Lưu user mới vào database
	user
		.save()
		// tạo idToken và refreshToken (refreshToken chỉ đc tạo 1 lần)
		.then(() => user.generateAuthTokens())
		// Gửi thông tin user, idToken, refreshToken, thời gian hiệu lực của idToken về cho client
		.then(tokens => {
			res.status(201).send({
				user,
				idToken: tokens.idToken,
				refreshToken: tokens.refreshToken,
				expiresIn: process.env.TOKEN_LIFE
			});
		})
		.catch(err => res.send());
}

// Hàm dùng trong route /user/login
function login(req, res) {
	// Lấy các properties cần thiết trong request
	let body = _.pick(req.body, ["email", "password"]);

	// Tìm user trong database theo email và so sánh password từ request với password mã hoá trong database
	User.findByCredentials(body.email, body.password)
		.then(user => {
			// Tạo idToken mới và lấy refreshToken trong database
			let tokens = user.generateIdToken();

			// Gửi thông tin user, idToken, refreshToken, thời gian hiệu lực của idToken về cho client
			res.status(200).send({
				user,
				idToken: tokens.idToken,
				refreshToken: tokens.refreshToken,
				expiresIn: process.env.TOKEN_LIFE
			});
		})
		.catch(err => res.status(400).send(err));
}

// Hàm dùng trong route /user/resend-idtoken
function resendIdToken(req, res) {
	// Lấy các properties cần thiết trong request
	let { refreshToken } = _.pick(req.body, ["refreshToken"]);

	if (refreshToken) {
		// Tìm user trong database theo refreshToken
		User.findOne({ refreshToken })
			.then(user => {
				if (user) {
					// Tạo idToken mới và gửi về cho client
					let { idToken } = user.generateIdToken();
					res.status(201).send({ idToken });
				} else {
					return res.status(401).send({
						error: true,
						message: "No user found"
					});
				}
			})
			.catch(err => res.status(400).send());
	} else {
		return res.status(401).send({
			error: true,
			message: "No refresh token provided"
		});
	}
}

module.exports = { register, login, resendIdToken };