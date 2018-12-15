const { mongoose } = require("./../db/mongoose");

function register(req, res) {
	res.status(200).send(req.body);
}

function login(req, res) {
	res.status(200).send(req.body);
}

module.exports = { register, login };
