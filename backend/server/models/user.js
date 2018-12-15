const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email"
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	role: {
		type: String,
		required: true,
		enum: ["Rider", "Driver", "Administrator"]
	},
	refreshToken: {
		type: String,
		required: true
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
