const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		minLength: 3,
		maxLength: 20,
		unique: true
	},
	email: {
		type: String,
		require: true,
		maxLength: 50,
		unique: true
	},
	password: {
		type: String,
		require: true,
		minLength: 8,
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false
	},
	avatarImage: {
		type: String,
		default: '',
	}
});
module.exports = mongoose.model('Users', userSchema);