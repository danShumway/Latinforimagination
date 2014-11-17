var path = require('path'); 
var Account = require('../models/user');


var site = function(app, passport) {

	//---------HOME-----------------------
	app.get('/', function(req, res) { res.redirect('/home'); });
	app.get('/home', function(req, res) {

		//Grab a random quote.
		var quotes = new Array();	
		quotes.push("Quidquid latine dictum, altum videtur");
		quotes.push("What, were you expecting something witty?");
		quotes.push("We make art look good.");
		quotes.push("Want to be friends?");
		quotes.push("Everything is going to be OK.");
		quotes.push("Odds are, I'm working on a game right now.");
		quotes.push("Everything will end in sunshine and rainbows.");
		quotes.push("Want to see something cool?");

		//Render page.
		res.render('home', {
			title:"Latinforimagination",
			pageCSS:"assets/css/pages/home.css",
			backgroundScript: "assets/scripts/backgrounds/home.js",
			loggedIn: loggedIn(req, res),
			username: (req.user)? req.user.local.username : undefined,
			quote: quotes[Math.floor(Math.random()*quotes.length)],
			helpers: {
				backgroundScript: function() { return "assets/scripts/backgrounds/home.js" },
			}
		});
	});

	//----CURRENT PROJECTS---------------

	//---------------------piglet------------------------
	app.get('/piglet', function(req, res) {
		res.render('piglet', {
			title:"Piglet",
			pageCSS:"assets/css/pages/piglet.css",
			backgroundScript: "assets/scripts/backgrounds/home.js",
			loggedIn: loggedIn(req, res),
			username: (req.user)? req.user.local.username : undefined,
		});
	});

	//---------------------halloween-touch----------------
		app.get('/halloween_touch', function(req, res) {
			/*res.redirect('/halloween_touch/home');*/
			res.render('halloween_touch', {
				title:"Latinforimagination",
				pageCSS:"assets/css/pages/piglet.css",
				backgroundScript: "assets/scripts/backgrounds/home.js",
				quote: quotes[Math.floor(Math.random()*quotes.length)],
			});
		});

		/*app.get('halloween_touch/home', function(req, res){
			res.render('home', {
				title:"Latinforimagination",
				pageCSS:"assets/css/pages/home.css",
				backgroundScript: "assets/scripts/backgrounds/home.js",
				quote: quotes[Math.floor(Math.random()*quotes.length)],
			});
		});*/





	//------APPS-------------------------
	/*app.get('/SwapCounter', mid.requiresLogin, function(req, res) {
		//We have to render a response.
		//We have to start up the app.
		//When navigating away, we have to stop the app.
		//Etc...
	});*/

	//--------SIGNUP AND LOGIN-----------

	app.post('/login', function(req, res) {
		passport.authenticate('local-login', function(err, user, info) {
			if(err) { console.log('there was an error'); }
			if(!user) { console.log('you were not authenticated'); }

			if(user) { 		
				req.login(user, function(err) {
					if(err){ res.send("error"); return; };
					res.send("success"); return;
				});
			} else {
				res.send("error"); return;
			}
		})(req, res);
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/signup', function(req, res) {
		passport.authenticate('local-signup', function(err, user, info) {
			/*if(err) { console.log('there was an error'); }
			if(!user) { 
				console.log('you were not signed up!'); 
			}*/
			if(user) { 
				req.logout();
				req.login(user, function(err) {
					if(err){ res.send("error"); return; };
					res.send("success"); return;
				})
				return;
			} else {
				if(req.flash('signupMessage') == "username_error") {
					res.send("username_error");
				} else {
					res.send("error");
				}
			}
		})(req, res);
	});

	app.get('/signup', function(req, res) {
		console.log('get request recieved')
		res.render('signup', {
			title:"Latinforimagination",
			pageCSS:"assets/css/pages/signup.css",
			backgroundScript: "assets/scripts/backgrounds/home.js",
			loggedIn: loggedIn(req, res),
			username: (req.user)? req.user.local.username : undefined,
		})
	})

	app.get('/test', function(req, res) {
		if(req.isAuthenticated()){
			console.log(req.user.local.username + ' successfully accessed page');
		} else { console.log('not logged in'); }

		res.redirect('/');
	});

	//----------------HELPERS----------------------------

	//To be used internally to signal whether or not the user is logged in to the page.
	function loggedIn(req, res) {
		if(req.isAuthenticated()){
			return true;
		} else {
			return false;
		}
	}

	//Middleware to require login.
	function requireLogin(req, res, next) {

	}


	/*app.post('/signup', function(req, res) {
		Account.register(new Account({username:req.body.username}), req.body.password, function(err, account){
			if(err) {
				return res.render('signup', { account : account });
			}
		});
	});*/

};

module.exports.site = site;