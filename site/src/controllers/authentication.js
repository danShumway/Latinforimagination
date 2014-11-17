(function() { 'use strict'; })();

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
	//passport session setup for persistant login sesions.
	//Allows passport to serialize and unserialize users from the session.

	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Local signup
    //We have a named strategy for login and for signup.
    passport.use('local-signup', new LocalStrategy({
    	//By default, local strategy uses username and password.
    	//I'm using email for username.
    	usernameField: 'username',
    	passwordField: 'password',
    	passReqToCallback: true //pass the entire request to the callback.
    },
    function(req, username, password, done) {
    	//Find a user who's email is the same as the passed in email.
    	//See if they already exist.
    	User.findOne({ 'local.username' : username }, function(err, user) {
    		if(err) { console.log('there was an error signing up '+ username); return done(err); }

    		//Is there arlready a user?
    		if(user) {
    			console.log('user ' + username + 'already exists');
    			return done(null, false, req.flash('signupMessage', 'username_error'));
    		} else {
    			//no user with that email, so create it.
    			var newUser = new User();
    			newUser.local.username = username;
    			newUser.local.password = newUser.generateHash(password);

    			if(req.body && req.body.email) {
    				newUser.local.email = req.body.email;
    			}

    			//Save
    			newUser.save(function(err) {
    				if(err){ throw err; }
    				return done(null, newUser, req.flash('signupMessage', 'Success'));
    			});

    			console.log(username + ", " + password + ", " + newUser.local.email + " was signed up.");
    		}
    	});
    }));

	//Local login.
	passport.use('local-login', new LocalStrategy({
		//we overwrite username and password with our own stuff.
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback: true
	},
	function(req, username, password, done) {

		//Check to see if a user whose email and password are the same exist.
		User.findOne({ 'local.username' : username }, function(err, user) {
			if(err) { return done(err); }

			if(!user || !user.validPassword(password)) {
				console.log('username or passwrod is wrong.');
				return done(null, false/*, req.flash stuff*/);
			}

			//all is done, return succsessful user.
			console.log('successful login');
			return done(null, user);
		});
	}));
};
