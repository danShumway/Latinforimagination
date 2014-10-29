var path = require('path'); 

//var base_path = 

var siteNavigation = function(app) {

	//
	app.get('/', function(req, res) {
		res.send('<h1>Hello World</h1>');
		//res.sendFile(path.resolve(__dirname+'../../../client/mainpage.html'));
	});


	//----CURRENT PROJECTS---------------

};

module.exports.siteNavigation = siteNavigation;