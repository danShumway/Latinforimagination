//---------------INCLUDE-----------------------

var path = require('path'); //path is a built-in node library to handle file system paths
var express = require('express'); //express is a popular Model-View-Controller framework for Node
var compression = require('compression'); //compression library to gzip responses for smaller/faster transfer
console.log('hi');
var favicon = require('serve-favicon'); //favicon library to handle favicon requests
var cookieParser = require('cookie-parser'); //Library to parse cookies from the requests
//-------------SETUP----------------------------

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use(compression()); //Not sure why this is here.
app.set('view engine', 'jade'); //I gues?
//app.set('views', __dirname + '../../client/template');
//app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); //Set up static assets.
//app.use(favicon(__dirname + '../../client/img/favicon.png'));
//app.use(cookieParser()); //Not sure why this is here.

//router(app);
var constructor = require("./controllers/pageConstructor.js");
var navigation = require("./controllers/siteNavigation.js");

//Set up my paths. Some thought could go in here.
navigation.siteNavigation(app);


//------------LAUNCH SERVER--------------------------------
var server = app.listen(port, function(err) {
	if(err) {
		throw err;
	} else { //Uneccessary, but clearer.
		console.log('Listening on port: ' + port);
	}
});

//----------------ROUTER------------------------------------

//var viewPath = path.resolve(__dirname+'') //Path to my pages.

//We'll use handlebars for view engines.

//var dbURL = process.env.MONGOH!_URL || "mongodb://localhost/DomoMaker"

//res.redirect.
//pdkdf2 - some stuff.
//npm test & jshint