//---------------INCLUDE-----------------------
var path = require('path'); //path is a built-in node library to handle file system paths
var express = require('express'); //express is a popular Model-View-Controller framework for Node
var compression = require('compression'); //compression library to gzip responses for smaller/faster transfer
var favicon = require('serve-favicon'); //favicon library to handle favicon requests
var cookieParser = require('cookie-parser'); //Library to parse cookies from the requests
var express_handlebars = require('express-handlebars'); //What we're using to compile the pages.
//-------------SETUP----------------------------

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use(compression()); //Not sure why this is here.



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

//router(app);
var constructor = require("./controllers/pageConstructor.js");
var navigation = require("./controllers/siteNavigation.js");

//Set up my paths. Some thought could go in here.
//constructor.
//navigation.siteNavigation(app);
app.get('/', function(req, res) {
	//res.send('<h1>Hello World</h1>');
	//res.sendFile(templates + "/header.html");
	res.render('home')
	//res.sendFile(templates + "/footer.html");
});


console.log('starting server');
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