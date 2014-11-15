'use-strict'

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
    	usernameField: 'email',
    	passwordField: 'password',
    	passReqToCallback: true //pass the entire request to the callback.
    },
    function(req, email, password, done) {
    	//Find a user who's email is the same as the passed in email.
    	//See if they already exist.
    	User.findOne({ 'local.email' : email }, function(err, user) {
    		if(err) { return done(err); }

    		//Is there arlready a user?
    		if(user) {
    			return done(null, false/*req.flash('signupMessage', 'That email is already taken.'));*/);
    		} else {
    			//no user with that email, so create it.
    			var newUser = new User();
    			newUser.local.email = email;
    			newUser.local.passwrod = newUser.generateHash(password);

    			//Save
    			newUser.save(function(err) {
    				if(err){ throw err; }
    				return done(null, newUser);
    			});
    		}
    	});
    }));

	//Local login.
	passport.use('local-login', new LocalStrategy({
		//we overwrite username and password with our own stuff.
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {

		//Check to see if a user whose email and password are the same exist.
		User.findOne({ 'local.email' : email }, function(err, user) {
			if(err) { return done(err); }

			if(!user || !user.validPassword(password)) {
				return done(null, false/*, req.flash stuff*/);
			};

			//all is done, return succsessful user.
			return done(null, user);
		});
	}));
};




/*'use-strict'

//Import----------------------------------
var passport = require('passport');
var localStrategy = require('passport-local').Strategy; //We'll use this for local login. 
var expressSession = require('express-session'); //Used to manage sessions.
var User = require('models/user.js'); //We have a model of a user.
//----------------------------------------

var url = process.env.MONGOHQ_URL || "mongodb://localhost/DomoMaker"; //MongoDB url.
mongoose.connect(url);

app.use(expressSession({secret: 'mySecretKeyGoesHere'}));
app.use(passport.initialize());
app.use(passport.session());


module.exports = function(passport) {


	//Used for persistent login sessions.
	passport.serializeUser(function(user, done){
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});


	//Using something called named strategies.  One for login, one for signup.
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField: 'password',
		passReqToCallback: true //Allows us to pass back the entire request to the callback.
	}, function(req, email, password, done) {
		//Asynchronous, User.findOne wont fire unless data is sent back
		process.nextTick(function() {
			//Find a user where the email is the same as the forms email.
			//Check to see if the user loging in exist.
			User.findOne({ 'local.email': email }, function(err, user) {
				if(err) { return done(err); }
				if(user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					var newUser = new User(); //If not, make the user.

					n
				}
			})
		}
	}));
};
*/
