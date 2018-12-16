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

module.exports = { register, login };
