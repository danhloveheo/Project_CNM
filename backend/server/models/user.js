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
		expiresIn: process.env.TOKEN_LIFE
	});
	let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);

	this.refreshToken = refreshToken;
	return this.save().then(() => {
		return { idToken, refreshToken };
	});
};

UserSchema.methods.generateIdToken = function() {
	let payload = {
		email: this.email,
		role: this.role
	};

	let idToken = jwt.sign(payload, process.env.JWT_ID_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_LIFE
	});

	let refreshToken = this.refreshToken;
	return { idToken, refreshToken };
};

UserSchema.statics.findByCredentials = function(email, password) {
	return this.findOne({ email })
		.then(user => {
			if (!user) {
				return Promise.reject();
			}

			return new Promise((resolve, reject) => {
				bcrypt.compare(password, user.password, (err, res) => {
					if (res) {
						resolve(user);
					} else {
						reject();
					}
				});
			});
		})
		.catch(err => {
			return Promise.reject();
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
