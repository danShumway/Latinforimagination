(function() { 'use strict'; })();

window.canvas_environment.internal_resolution = {"x":500, "y":100};
var canvas = document.getElementById("background-canvas");
var ctx = canvas.getContext('2d');
var _1 = _g(1);


var Cloud = function(x, y, speed, radius) {

	this.x = x; this.y = y; this.speed = speed;

	var pieces = [];
	for(var i = 0; i < 10; i++){
		pieces.push({
			"x":Math.floor(Math.random()*20),
			"y":Math.floor(Math.random()*10),
			"radius":Math.floor(Math.random()*radius),
		});
	}

	this.draw = function(){
		for(var p in pieces){
			piece = pieces[p];
			ctx.fillStyle = 'rgb(255, 255, 255)';
			for(var y = this.y - piece.radius; y < this.y + piece.radius; y++){
				var level = Math.min(Math.abs(y - (this.y - piece.radius)), Math.abs(y - (this.y + piece.radius)));
				ctx.fillRect(_g(this.x-level), _g(y), _g(level*2), _1);
			}
		}
	};

	this.update = function() {
		this.x -= this.speed;
		if(this.x < 0) {
			this.x = 510+Math.random()*20;
			this.y = Math.floor(Math.random()*100);
		}
	};

	this.castShadow = function(ground, distance) {
		ctx.fillStyle = 'rgb(140, 200, 160)';
		for(var p in pieces){
			piece = pieces[p];
			for(var y = this.y - piece.radius*1.2; y < this.y + piece.radius*1.2; y++){
				var level = Math.min(Math.abs(y - (this.y - piece.radius*1.2)), Math.abs(y - (this.y + piece.radius*1.2)));
				for(var x = this.x - level; x < this.x + level; x++){
					x = Math.floor(x);
					if(y-distance >= ground.area[x-distance]) {
						ctx.fillRect(_g(x-distance), _g(y-distance), _1, _1 );
					}
				}
			}
		}
	};
};

var Ground = function(color, max_elevation){


	this.area = [];
	var currentElevation = 100;//Math.floor(Math.random()*50)+50;
	var targetElevation = Math.floor(Math.random()*max_elevation);
	for (var i = 0; i < 500; i++){
		var choice = Math.random();
		if(choice < 0.5){
			if(currentElevation < targetElevation) {
				currentElevation++;
			} else {
				currentElevation--;
			}
		} else if (choice < 0.7) {
			if(currentElevation < targetElevation) {
				currentElevation+=2;
			} else {
				currentElevation-=2;
			}
		} else if(choice > 0.97) {
			targetElevation = Math.floor(Math.random()*max_elevation);
		}
		this.area.push(currentElevation);
	}
	this.draw = function(){
		ctx.fillStyle=color;
		for(var i = 0; i < this.area.length; i++){
			ctx.fillRect(_g(i), _g(this.area[i]), _1, _1*150);
		}
	};

	this.update = function(){

	};
};

var Sky = function(r, g, b) {

	this.color = {"r":r, "g":g, "b":b};
	this.breaks = [];

	var prev = 0;
	for(var i = 10; i > 0; i--){
		this.breaks.push({
			"r":r + (230 - r)*i/10,
			"g":g + (230 - r)*i/10,
			"b":b + (230 - r)*i/10,
			"y":prev
		});
		prev+=Math.floor(Math.random()*10);
	}

	this.draw = function(){
		for(var i = 0; i<10; i++){
			ctx.fillStyle='rgb('+ this.breaks[i].r +', '+ this.breaks[i].g+', '+ this.breaks[i].b+')';
			ctx.fillRect(0, _g(this.breaks[i].y), 500*_1, 100*_1);
		}
	};
};

//-----------------------------------------------------------------------------------------------

var sky, ground, sprites, clouds;
var init = function() {
	sky = new Sky(100, 100, 255);
	ground = new Ground('rgb(100, 200, 150', 100);

	var i;
	clouds = []; for(i = 0; i < 30; i++){ 
		clouds.push(new Cloud(Math.floor(Math.random()*500), Math.floor(Math.random()*100), Math.random()*0.3, 20));
	}
	sprites = []; for(i = 0; i < 10; i++){ 
		sprites.push(new Cloud(Math.floor(Math.random()*500), Math.floor(Math.random()*100), Math.random()*0.3+0.2, 5));
	}


	//Start
	window._animate(draw, 25);
};

//-------------------------------------------------------------------------------------------------

var draw = function() {
	ctx.fillStyle = 'rgb(200, 200, 255)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	sky.draw();

	for(var cloud in clouds){
		clouds[cloud].draw();
		clouds[cloud].update();
	}

	ground.draw();

	for(var sprite in sprites){
		sprites[sprite].castShadow(ground, -8);
	}

	for(sprite in sprites){
		sprites[sprite].draw();
		sprites[sprite].update();
	}
};

init();
