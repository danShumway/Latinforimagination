var path = require('path'); 

var templates = path.resolve(__dirname + '/../templates');
var pages = path.resolve(__dirname + '/../pages');

var siteNavigation = function(app) {

	//
	app.get('/', function(req, res) {
		//res.send('<h1>Hello World</h1>');
		res.sendFile(templates + "/header.html");
		res.sendFile(templates + "/footer.html");
	});


	//----CURRENT PROJECTS---------------

};

module.exports.siteNavigation = siteNavigation;