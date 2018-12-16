const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
		type: String
	}
});

UserSchema.methods.toJSON = function() {
	return _.pick(this, ["firstName", "lastName", "email", "role"]);
};

UserSchema.methods.generateAuthTokens = function() {
	let payload = {
		email: this.email,
		role: this.role
	};

	let idToken = jwt.sign(payload, process.env.JWT_ID_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_EXPIRES_IN
	});
	let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);

	this.refreshToken = refreshToken;
	return this.save().then(() => {
		return { idToken, refreshToken };
	});
};

UserSchema.pre("save", function(next) {
	if (this.isModified("password")) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
