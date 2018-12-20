const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

// Tạo schema cho user document
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

// Hàm quy định các properties của user được trả về cho client
UserSchema.methods.toJSON = function() {
	return _.pick(this, ["firstName", "lastName", "email", "role"]);
};

// Hàm tạo idToken và refreshToken
UserSchema.methods.generateAuthTokens = function() {
	let payload = {
		email: this.email,
		role: this.role
	};

	// Tạo idToken và refreshToken
	let idToken = jwt.sign(payload, process.env.JWT_ID_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_LIFE
	});
	let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET);

	// Lưu refreshToken vào database
	this.refreshToken = refreshToken;
	return this.save().then(() => {
		// Trả vế giá trị idToken và refreshToken
		return { idToken, refreshToken };
	});
};

// Hàm tạo idToken mới
UserSchema.methods.generateIdToken = function() {
	let payload = {
		email: this.email,
		role: this.role
	};

	// Tạo idToken mới
	let idToken = jwt.sign(payload, process.env.JWT_ID_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_LIFE
	});

	let refreshToken = this.refreshToken;
	// Trả vế giá trị idToken và refreshToken
	return { idToken, refreshToken };
};

// Hàm tìm user trong database theo email và so sánh password
UserSchema.statics.findByCredentials = function(email, password) {
	// Tìm user trong database theo email
	return this.findOne({ email })
		.then(user => {
			if (!user) {
				return Promise.reject();
			}

			return new Promise((resolve, reject) => {
				// So sánh password đầu vào với password đã mã hoá trong database
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

// Hàm mã hoá password của user trước khi lưu vào database
UserSchema.pre("save", function(next) {
	if (this.isModified("password")) {
		// Tạo salt, sau đó mã hoá password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(this.password, salt, (err, hash) => {
				this.password = hash;
				next();
			});
		});
	} else {
		// Bắt đầu lưu user vào database
		next();
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
