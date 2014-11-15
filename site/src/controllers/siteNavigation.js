var path = require('path'); 
var Account = require('../models/user');


var site = function(app, passport) {

	//---------HOME-----------------------
	app.get('/', function(req, res) {

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
			quote: quotes[Math.floor(Math.random()*quotes.length)],
			helpers: {
				backgroundScript: function() { return "assets/scripts/backgrounds/home.js" },
			}
		});
	});

	app.get('/about', function(req, res) {
		res.render('about');
	});

	//----CURRENT PROJECTS---------------



	//------APPS-------------------------
	/*app.get('/SwapCounter', mid.requiresLogin, function(req, res) {
		//We have to render a response.
		//We have to start up the app.
		//When navigating away, we have to stop the app.
		//Etc...
	});*/

	app.post('/login', function(req, res) {
		passport.authenticate('local-login', function(err, user, info) {
			if(err) { console.log('there was an error'); }
			if(!user) { console.log('you were not authenticated'); }
			if(user) { console.log('you were authenticated'); }
			
			req.login(user, function(err) {
				if(err){ return next(err); };
				res.redirect('/');
			});
		})(req, res);
	});

	//------LOGIN/LOGOUT-------------------
	app.get('/test', function(req, res) {
		if(req.isAuthenticated()){
			console.log(req.user.local.username + ' successfully accessed page');
		} else { console.log('not logged in'); }

		res.redirect('/');
	});

	app.post('/signup', function(req, res) {
		passport.authenticate('local-signup', function(err, user, info) {
			if(err) { console.log('there was an error'); }
			if(!user) { console.log('you were not signed up!'); }
			if(user) { console.log('you were signed up'); }

			res.redirect('/');
		})(req, res);
	});




	/*app.post('/signup', function(req, res) {
		Account.register(new Account({username:req.body.username}), req.body.password, function(err, account){
			if(err) {
				return res.render('signup', { account : account });
			}
		});
	});*/

};

module.exports.site = site;