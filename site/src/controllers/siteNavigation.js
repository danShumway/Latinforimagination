var path = require('path'); 


var site = function(app) {

	//---------HOME-----------------------
	app.get('/', function(req, res) {
		res.render('home', {
			title:"Latinforimagination",
			helpers: {
				func: function() { return "I can do whatever here" }
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

};

module.exports.site = site;