'use-strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

//What fields will exist for our user.
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		email: String,
		//other fields will likely go here.
	}
});

//Generate a hash of a password.
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check if a password is valid.
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);



