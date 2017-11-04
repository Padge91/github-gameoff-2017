var gameWindowSize ={x:1000, y:600};

var game = new Phaser.Game(gameWindowSize.x, gameWindowSize.y, Phaser.CANVAS, 'github-gameoff-2017', {preload:preload, create:create});

//load assets
function preload() {
	loadTextures();
	loadAnimations();
}

//load animations
function loadAnimations(){
	var animationsPath="/images/";
	var extension=".png";
	var animations=[{name:"arcade-screen", x:320,y:270,size:2}];
	
	for (var i = 0; i < animations.length; i++){
		game.load.spritesheet(animations[i].name, animationsPath+animations[i].name+extension, animations[i].x, animations[i].y, animations[i].size);
	}
}

//load textures
function loadTextures(){
	var texturesPath="/images/";
	var extension=".png";
	var textures=["test", "floor-pattern", "arcade-machine-side-perspective-red", "arcade-machine-side-perspective-purple", "arcade-machine-side-perspective-green", "arcade-machine-side-perspective-blue", "arcade-machine-front-pixelated", "character1","character2","character3","character4","character1-back","character2-back","lighting"];
	
	for (var i = 0; i < textures.length; i++){
		game.load.image(textures[i], texturesPath+textures[i]+extension);
	}
}

//start
function create() {
	loadArcadeScene();
}


//load arcade scene
function loadArcadeScene(){
	loadArcadeFloor();
	loadArcadeWalls();
	loadArcadeMachines();
	loadNPCs();
	loadPlayer();
}

//load player
function loadPlayer(){

}

//load arcade walls
function loadArcadeWalls(){

}

//load arcade machines
function loadArcadeMachines(){
	var frontArcadeMachineLocations = [{x:0,y:0},{x:100,y:0},{x:200,y:0},{x:600,y:0},{x:500,y:0}]
	var machineScale = .7;
	for (var i = 0; i < frontArcadeMachineLocations.length; i++){
		var s = game.add.sprite(frontArcadeMachineLocations[i].x, frontArcadeMachineLocations[i].y, "arcade-machine-front-pixelated");
		s.scale.setTo(machineScale, machineScale);
	}

	var sideMachineScale = 1;
	var sideArcadeMachineLocations = [{x:-200,y:100, sprite:"arcade-machine-side-perspective-red", reverse:false}, {x:-200,y:200,sprite:"arcade-machine-side-perspective-blue", reverse:false}, {x:-200,y:300, sprite:"arcade-machine-side-perspective-purple", reverse:false}, {x:200,y:200,sprite:"arcade-machine-side-perspective-green", reverse:true}, {x:200,y:300,sprite:"arcade-machine-side-perspective-blue", reverse:true}, {x:260,y:200, sprite:"arcade-machine-side-perspective-purple", reverse:false}, {x:260,y:300, sprite:"arcade-machine-side-perspective-red", reverse:false}];
	for (var i = 0; i < sideArcadeMachineLocations.length; i++){
		var s = game.add.sprite(sideArcadeMachineLocations[i].x, sideArcadeMachineLocations[i].y, sideArcadeMachineLocations[i].sprite);
		s.scale.setTo(sideMachineScale, sideMachineScale);
		if (sideArcadeMachineLocations[i].reverse){
			s.anchor.setTo(.75,0);
			s.scale.x *= -1;
		}
	}

	var flashingScaleX = .4, flashingScaleY=.7;
	var flashingAnimationLocations = [{x:110,y:150,rotation:0, speed:5},{x:110,y:250,rotation:0, speed:0},{x:110,y:350,rotation:0, speed:0},{x:580,y:350,rotation:0, speed:5},{x:580,y:250,rotation:0, speed:0},{x:380,y:350,rotation:180, speed:5},{x:380,y:250,rotation:180, speed:0},{x:900,y:150,rotation:90, speed:0},{x:400,y:150,rotation:90, speed:0},{x:800,y:150,rotation:90, speed:5}];
	var animationName = "arcade-screen";
	for (var i  = 0; i < flashingAnimationLocations.length; i++){
		var s = game.add.sprite(flashingAnimationLocations[i].x,flashingAnimationLocations[i].y, animationName);
		s.scale.setTo(flashingScaleX, flashingScaleY);
		if (flashingAnimationLocations[i].rotation==180){
			s.scale.x *= -1;
		} else if (flashingAnimationLocations[i].rotation==90){
			//rotate
			s.rotation = 1.55;
		}
		s.animations.add(animationName);
		s.animations.play(animationName, flashingAnimationLocations[i].speed, true);
	}
}

//load characters
function loadNPCs(){
	var characters = [{x:90,y:400,sprite:"character1",reverse:false},{x:90,y:300,sprite:"character4",reverse:false},{x:300,y:300,reverse:true,sprite:"character3"},{x:550,y:300,reverse:false,sprite:"character2"},{x:740,y:100,reverse:false,sprite:"character1-back"},{x:240,y:100,reverse:false,sprite:"character2-back"}]
	var scale = .3;

	for (var i = 0; i < characters.length; i++){
		var s = game.add.sprite(characters[i].x, characters[i].y, characters[i].sprite);
		s.scale.setTo(scale, scale);
		if (characters[i].reverse){
                        s.anchor.setTo(.75,0);
                        s.scale.x *= -1;
                }
	}
	
}

//load arcade floor
function loadArcadeFloor(){
        var floorTilesTexture = "floor-pattern";
        var tileSize = 100;
        var numberOfTilesX = gameWindowSize.x / tileSize;
        var numberOfTilesY = gameWindowSize.y / tileSize;

        for (var i = 0; i < numberOfTilesX; i++){
                for (var i2 = 0; i2 < numberOfTilesY; i2++){
                        var x = i*tileSize;
                        var y = i2*tileSize;
                        var s = game.add.sprite(x,y,floorTilesTexture);
                        var scaleValue = tileSize / s.width;
                        s.scale.setTo(scaleValue, scaleValue);
                }
        }

	game.add.sprite(0,0,"lighting");
}
