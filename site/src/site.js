'use strict';

//---------------INCLUDE-----------------------
var path = require('path'); //path is a built-in node library to handle file system paths
var express = require('express'); //express is a popular Model-View-Controller framework for Node
var compression = require('compression'); //compression library to gzip responses for smaller/faster transfer
var favicon = require('serve-favicon'); //favicon library to handle favicon requests
var cookieParser = require('cookie-parser'); //Library to parse cookies from the requests
var express_handlebars = require('express-handlebars'); //What we're using to compile the pages.
var passport = require('passport');
var session = require('express-session');

//--------------MONGOOSE------------------------
//Used for database and login.
var mongoose = require('mongoose');
var dbURL = process.env.MONGOHQ_URL || "mongodb://localhost/Local_Login";

var db = mongoose.connect(dbURL, function(err) {
    if(err) {
        console.log("Could not connect to database");
        throw err;
    }
});
//-------------SETUP----------------------------

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use(compression()); //Not sure why this is here.

//-----------SET UP HEADERS AND ASSETS------------------------------------------------
app.use('/assets', express.static(path.resolve(__dirname+'/assets'))); //Set up static assets.
app.use(favicon(__dirname + '/assets/favicons/16x16.ico'));
//app.use(cookieParser()); //Not sure why this is here.

//-----------SET UP HANDLEBARS AND RENDERING-------------------------------------------

var handlebars = express_handlebars.create({
	defaultLayout: 'main', 
	layoutsDir: path.resolve(__dirname + "/templates"),
	partialsDir: path.resolve(__dirname + "/templates/partials")
});


app.engine('handlebars', handlebars.engine);
app.set('views', path.resolve(__dirname + "/pages"));
app.set('view engine', 'handlebars'); //I guess?


//app.set('views', __dirname + '../../client/template');
//app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); //Set up static assets.
//app.use(favicon(__dirname + '../../client/img/favicon.png'));
//app.use(cookieParser()); //Not sure why this is here.

//default redis port: 6379
/*
var redisPass;
if(process.env.REDISCLOUD_URL) {
	redisURL = url.parse(process.env.REDISCLOUD_URL);
	redisPASS = redisURL.auth.split(":")[1];
}

app.use(session({
	store: new RedisStore({
		host: redisURL.hostname,
		port: redisURL.port,
		pass: redisPASS
	}),
}))

var requiresLogin = function(req, res, next) {
	//Code for login.

		//If not authenticated.
		return res.redirect('/');
	
	//else
	next();
}

//heroku addons:add redis-cloud

var requireSecure = function(req, res, next) {

	//If you're on your own server, just call 'req.secure'
	if(req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://' + req.host + req.url);
	}

	next();
}

var bypassSecure = function(req, res, next) {
	next();
}

if(process.env.NODE_ENV === "production") {
	module.exports.requireSecure = requireSecure;
} else {
	module.exports.requireSecure = bypassSecure;
}
some stuff*/

//------------CONFIGURE LOGIN AND SESSION-------------------------

require("./controllers/authentication.js")(passport); //Setup passport.
app.use(session({secret: 'mynameisdanielshumwayandthisismywebsite ', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session()); //persistant login sessions.


//app.use(flash()); If we want to send messages.  We don't.

/*mongoose.connect(dbConfig.url);
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKeyGoesHere'}));

passport.serializeUser(function(user, done){
	done(null, user._id);
})

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	})
})*/

//------------LAUNCH SERVER--------------------------------
var navigation = require("./controllers/siteNavigation.js");
navigation.site(app, passport);
//
var server = app.listen(port, function(err) {
	if(err) {
		throw err;
	} else { //Uneccessary, but clearer.
		console.log('Listening on port: ' + port);
	}
});

//ToDo:
//	Set up sessions.
//	Figure out how to get an online app or game running in that session.
//	Build and port over site.



//----------------ROUTER------------------------------------

//var viewPath = path.resolve(__dirname+'') //Path to my pages.

//We'll use handlebars for view engines.

//var dbURL = process.env.MONGOH!_URL || "mongodb://localhost/DomoMaker"

//res.redirect.
//pdkdf2 - some stuff.
//npm test & jshint