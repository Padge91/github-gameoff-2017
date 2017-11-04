var gameWindowSize ={x:1000, y:600};

var texturesPath="/images/";
var extension=".png";

var game = new Phaser.Game(gameWindowSize.x, gameWindowSize.y, Phaser.CANVAS, 'github-gameoff-2017', {preload:preload, create:create});

//load assets
function preload() {
	loadTextures();

}

//load textures
function loadTextures(){
	var texturesPath="/images/";
	var extension=".png";
	var textures=["test", "floor-pattern", "arcade-machine-side-perspective-red", "arcade-machine-side-perspective-purple", "arcade-machine-side-perspective-green", "arcade-machine-side-perspective-blue", "arcade-machine-front-pixelated"];
	
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
}

//load characters
function loadNPCs(){

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
}
