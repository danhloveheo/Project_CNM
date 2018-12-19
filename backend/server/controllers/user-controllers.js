const _ = require("lodash");

const { mongoose } = require("./../db/mongoose");
const { User } = require("./../models/user");

function register(req, res) {
	let body = _.pick(req.body, ["firstName", "lastName", "email", "password", "role"]);
	let user = new User(body);

	user
		.save()
		.then(() => user.generateAuthTokens())
		.then(tokens => {
			res.status(201).send({
				user,
				idToken: tokens.idToken,
				refreshToken: tokens.refreshToken,
				expiresIn: process.env.TOKEN_LIFE
			});
		})
		.catch(err => res.status(400).send());
}

function login(req, res) {
	let body = _.pick(req.body, ["email", "password"]);

	User.findByCredentials(body.email, body.password)
		.then(user => {
			let tokens = user.generateIdToken();
			res.status(200).send({
				user,
				idToken: tokens.idToken,
				refreshToken: tokens.refreshToken,
				expiresIn: process.env.TOKEN_LIFE
			});
		})
		.catch(err => res.status(400).send(err));
}

function resendIdToken(req, res) {
	let { refreshToken } = _.pick(req.body, ["refreshToken"]);

	if (refreshToken) {
		User.findOne({ refreshToken })
			.then(user => {
				if (user) {
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