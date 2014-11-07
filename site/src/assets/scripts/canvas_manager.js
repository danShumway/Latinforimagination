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
			return number*(e.display_resolution.y/e.internal_resolution.y);
		} else {
			throw "Improper dimension specified for conversion: canvas_manager: _g";
		}
	}

	window._l = function(number){
		var e = canvas_environment;
		if(e.use_dimension === "x") {
			return number*(e.internal_resolution.x/e.display_resolution.x);
		} else if (e.use_dimension === "y") {
			return number*(e.internal_resolution.y/e.display_resolution.y);
		} else {
			throw "Improper dimension specified for conversion: canvas_manager: _l";
		}
	}

	window._animate = function(framerate, callback) {
		var handler = {
			"running":true,
			"currentFrame":0,
			"framerate":framerate
		};

		var lastTime = undefined;
		var elapsed = 0;
		(function checkFrame(){
			var time = new Date().getTime();
			if(lastTime) { elapsed += time - lastTime; }
			lastTime = time;

			var target = 1000/handler.framerate;
			if(elapsed > target){
				elapsed = 0;
				callback();
			}

			if(handler.running) {
				requestAnimationFrame(checkFrame);
			}
		})();

		return handler;
	}
})();