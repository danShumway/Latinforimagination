window.canvas_environment.internal_resolution = {"x":500, "y":100};
var canvas = document.getElementById("background-canvas");
var ctx = canvas.getContext('2d');


var Cloud = function(x, y, speed, radius) {

	this.x = x; this.y = y; this.speed = speed;

	var pieces = [];
	for(var i = 0; i < 10; i++){
		pieces.push({
			"x":Math.floor(Math.random()*20),
			"y":Math.floor(Math.random()*10),
			"radius":Math.floor(Math.random()*radius),
		})
	}

	this.draw = function(){
		for(p in pieces){
			piece = pieces[p];
			ctx.fillStyle = 'rgb(255, 255, 255)';
			for(var y = this.y - piece.radius; y < this.y + piece.radius; y++){
				var level = Math.min(Math.abs(y - (this.y - piece.radius)), Math.abs(y - (this.y + piece.radius)));
				for(var x = this.x - level; x < this.x + level; x++){
					ctx.fillRect(_g(x), _g(y), _g(1), _g(1) );
				}
			}

			/*ctx.beginPath();
			ctx.arc(_g(this.x + piece.x), _g(this.y + piece.y), _g(piece.radius), 0, 2 * Math.PI);
			ctx.fill();*/
		}
	};

	this.update = function() {
		this.x -= this.speed;
		console.log()
		if(this.x < 0) {
			this.x = 510;
			this.y = Math.floor(Math.random()*100);
		}
	};

	this.castShadow = function(ground, distance) {
		ctx.fillStyle = 'rgb(140, 200, 160)';
		for(p in pieces){
			piece = pieces[p];
			for(var y = this.y - piece.radius*1.2; y < this.y + piece.radius*1.2; y++){
				var level = Math.min(Math.abs(y - (this.y - piece.radius*1.2)), Math.abs(y - (this.y + piece.radius*1.2)));
				for(var x = this.x - level; x < this.x + level; x++){
					x = Math.floor(x);
					//ctx.fillRect(_g(x-distance), _g(y-distance), _g(1), _g(1) );
					if(y-distance >= ground.area[x-distance]) {
						ctx.fillRect(_g(x-distance), _g(y-distance), _g(1), _g(1) );
					}
				}
			}
		}
	};
};

var clouds = [];
for(var i = 0; i < 30; i++){ 
	clouds.push(new Cloud(Math.floor(Math.random()*500), Math.floor(Math.random()*100), Math.random()*.3, 20));
}

var sprites = [];

for(var i = 0; i < 10; i++){ 
	sprites.push(new Cloud(Math.floor(Math.random()*500), Math.floor(Math.random()*100), Math.random()*.3+.2, 5));
}

var Ground = function(color, max_elevation){


	this.area = [];
	var currentElevation = 100;//Math.floor(Math.random()*50)+50;
	var targetElevation = Math.floor(Math.random()*max_elevation);
	for (var i = 0; i < 500; i++){
		var choice = Math.random();
		if(choice < .5){
			if(currentElevation < targetElevation) {
				currentElevation++;
			} else {
				currentElevation--;
			}
		} else if (choice < .7) {
			if(currentElevation < targetElevation) {
				currentElevation+=2;
			} else {
				currentElevation-=2;
			}
		} else if(choice > .97) {
			targetElevation = Math.floor(Math.random()*max_elevation);
		}
		this.area.push(currentElevation);
	}
	this.draw = function(){
		ctx.fillStyle=color;
		for(var i = 0; i < this.area.length; i++){
			ctx.fillRect(_g(i), _g(this.area[i]), _g(1), _g(200));
		}
	};

	this.update = function(){

	}
};

var ground = new Ground('rgb(100, 200, 150', 100);

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
			ctx.fillRect(0, _g(this.breaks[i].y), _g(500), _g(100));
		}
	}
};

var sky = new Sky(100, 100, 255);


var draw = function() {
	ctx.fillStyle = 'rgb(200, 200, 255)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	sky.draw();

	for(cloud in clouds){
		clouds[cloud].draw();
		clouds[cloud].update();
	}

	ground.draw();


	for(sprite in sprites){
		sprites[sprite].castShadow(ground, -8);
	}
	
	for(sprite in sprites){
		sprites[sprite].draw();
		sprites[sprite].update();
	}
}

window._animate(draw, 30);