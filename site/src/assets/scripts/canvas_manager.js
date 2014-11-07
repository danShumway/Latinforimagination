//sets up some global variables.
(function() {
	window.canvas_environment = {
		"internal_resolution" : {"x":1000, "y":200},
		"display_resolution": {"x":5000, "y":1000},
		"use_dimension": "x"
	}
	//Translates numbers from local to global resolution for canvas.
	window._g = function(number){
		var e = canvas_environment;
		if(e.use_dimension === "x") {
			return number*(e.display_resolution.x/e.internal_resolution.x);
		} else if (e.use_dimension === "y") {
			return number*(e.display_resolution.x/e.internal_resolution.x);
		} else {
			throw "Improper dimension specified for conversion: canvas_manager: _g";
		}
	}
})();