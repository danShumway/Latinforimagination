var path = require('path'); 


var constructPage = function(views, data, result) {

	//Construct a page using data and stuff.
	console.log("sending file");
	result.sendFile(data.url);
}