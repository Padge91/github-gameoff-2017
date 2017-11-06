var gameWindowSize ={x:1000, y:600};

var game = new Phaser.Game(gameWindowSize.x, gameWindowSize.y, Phaser.CANVAS, 'github-gameoff-2017', {preload:preload, create:create, update:update});
var player = null;
var cursors = null;
var speed = 170;
var colliders = null;


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
	var textures=["test", "floor-pattern", "arcade-machine-side-perspective-red", "arcade-machine-side-perspective-purple", "arcade-machine-side-perspective-green", "arcade-machine-side-perspective-blue", "arcade-machine-front-pixelated", "character1","character2","character3","character4","character1-back","character2-back","lighting","no-play"];
	
	for (var i = 0; i < textures.length; i++){
		game.load.image(textures[i], texturesPath+textures[i]+extension);
	}
}

//start
function create() {
	loadArcadeScene();
	loadPlayer();
}


//load arcade scene
function loadArcadeScene(){
	loadArcadeFloor();
	colliders = game.add.group();
	loadArcadeMachines();
	loadNPCs();
}

//load player
function loadPlayer(){
	player = game.add.sprite(100,100,'character1');
	player.scale.setTo(.3,.3);
	cursors = game.input.keyboard.createCursorKeys();

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
	//game.world.setBounds(0, 0, gameWindowSize.x, gameWindowSize.y);

}


function update(){
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	game.physics.arcade.collide(player, colliders);

	if (cursors.up.isDown){
		player.body.velocity.y -= speed;
	} else if (cursors.down.isDown){
		player.body.velocity.y += speed;
	}
	if (cursors.left.isDown){
		player.body.velocity.x -= speed;
	} else if (cursors.right.isDown){
		player.body.velocity.x += speed;
	}
}

function collisionHandler(){
	//console.log("out");
}

//load arcade machines
function loadArcadeMachines(){
	var frontArcadeMachineLocations = [{x:145,y:30},{x:245,y:30},{x:350,y:30},{x:650,y:30},{x:750,y:30}]
	var machineScale = .7;
	for (var i = 0; i < frontArcadeMachineLocations.length; i++){
		var s = game.add.sprite(frontArcadeMachineLocations[i].x, frontArcadeMachineLocations[i].y, "arcade-machine-front-pixelated");
		game.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.immovable = true;
		s.scale.setTo(machineScale, machineScale);
		s.body.setSize(30,20,60,50);
		colliders.add(s);
	}

	var sideMachineScale = 1;
	var sideArcadeMachineLocations = [{x:0,y:200, sprite:"arcade-machine-side-perspective-red", reverse:false}, {x:0,y:400,sprite:"arcade-machine-side-perspective-blue", reverse:false}, {x:0,y:300, sprite:"arcade-machine-side-perspective-purple", reverse:false}, {x:400,y:300,sprite:"arcade-machine-side-perspective-green", reverse:true}, {x:400,y:400,sprite:"arcade-machine-side-perspective-blue", reverse:true}, {x:470,y:400, sprite:"arcade-machine-side-perspective-purple", reverse:false}, {x:470,y:300, sprite:"arcade-machine-side-perspective-red", reverse:false}];
	for (var i = 0; i < sideArcadeMachineLocations.length; i++){
		var s = game.add.sprite(sideArcadeMachineLocations[i].x, sideArcadeMachineLocations[i].y, sideArcadeMachineLocations[i].sprite);
		s.scale.setTo(sideMachineScale, sideMachineScale+.5);
		if (sideArcadeMachineLocations[i].reverse){
			s.anchor.setTo(.75,0);
			s.scale.x *= -1;
		}
		game.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.immovable = true;
		s.body.setSize(30,20,30,20);
		colliders.add(s);
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

	//out of order textures
	var OOOTextureName="no-play";
	var OOOObjects=[{x:160,y:90},{x:360,y:90}]
	for (var i = 0; i < OOOObjects.length;i++){
		var s = game.add.sprite(OOOObjects[i].x, OOOObjects[i].y, OOOTextureName);
		s.scale.setTo(.2,.2);
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
		game.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.immovable = true;
		s.body.setSize(-110,-50,270,200);
		colliders.add(s);

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
