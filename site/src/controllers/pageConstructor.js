var path = require('path'); 

var templates = path.resolve(__dirname + '/../templates');
var pages = path.resolve(__dirname + '/../pages');


var constructPage = function(views, data, result) {

	//Construct a page using data and stuff.
	console.log("sending file");
	result.sendFile(data.url);
};