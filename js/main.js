// --------------- QUINTUS ---------------

// Global control variables & functions
var current_level = 1;

function getLevel(level) {
	switch(level) {
		case 1:
			current_level = 1;
			return "level1";
		case 2:
			current_level = 2;
			return "level2";
		case 3:
			current_level = 3;
			return "level3";
		case 4:
			current_level = 4;
			return "level4";
	}
}

// Set up quintus object
var Q = Quintus({ audioSupported: [ 'wav' ] })
		.include("Sprites, Scenes, Input, 2D, UI, Anim, Touch, Audio")
        .setup({ width: 960, height: 640 })
        .touch()
		.controls()
		.enableSound();

// Collision Masks
Q.SPRITE_LADDER = 128; // Ladder collision mask
Q.SPRITE_PLATFORM = 256;
Q.SPRITE_COLLISION = 512;

// Assets
var assets = "tiles_map.png, hud.png, hud.json, p1_spritesheet.png, p1_spritesheet.json, level1.tmx, Level1_Data.json, level2.tmx, Level2_Data.json, level3.tmx, Level3_Data.json, level4.tmx, Level4_Data.json, enemies.png, enemies.json, snails.png, snails.json, blockers.png, blockers.json, traps.json, traps.png, items.png, items.json, map_interactions.png, map_interactions.json, ";
var sounds = "smb_1-up.wav, smb_coin.wav, smb_gameover.wav, smb_jump-small.wav, smb_mariodie.wav, smb_powerup.wav, smb_stage_clear.wav, smb_stomp.wav, smb_world_clear.wav, smb2_shrink.wav, main_theme.wav";
var fullAssets = assets + sounds;

// Scene for the loading bar
Q.scene("LoadingBar", function(stage) {
    var bar = stage.insert(new Q.UI.Container({
        fill: "red",
        x: 960/2,
        y: 640/2,
        border: 1,
        w: 960,
        h: 40
        })
    );

	var bar2 = stage.insert(new Q.UI.Container({
		fill: "green",
        x: 0,
        y: 640/2,
        border: 1,
		w: 0,
        h: 40
        })
    );
        
    var textLoad = stage.insert(new Q.UI.Text({ 
        label: "Loading...",
        color: "white",
        x: 960/2,
        y: 0
    }),bar2);               
             
});

// Set up the loading bar
Q.stageScene("LoadingBar", 0);
	
// Load the assets and stage the initial scene
Q.load(fullAssets, function() {
	// Create a sheet for the tiles
	Q.sheet("tiles", "tiles_map.png", { tileW: 70, tileH: 70 });      

	// Compile the spritesheet for the hud
	Q.compileSheets("hud.png", "hud.json");
	
	// Compile the animation spritesheet for the player
	Q.compileSheets("p1_spritesheet.png", "p1_spritesheet.json");

	// Compile the spritesheet for the items
	Q.compileSheets("items.png", "items.json");

	// Compile the spritesheet for the enemies
	Q.compileSheets("enemies.png", "enemies.json");

	// Compile the spritesheet fot he snails
	Q.compileSheets("snails.png", "snails.json");

	// Compile the spritesheet fot he blockers
	Q.compileSheets("blockers.png", "blockers.json");

	// Compile the spritesheet for the traps
	Q.compileSheets("traps.png", "traps.json");

	// Compile the spritesheet for the map interactions
	Q.compileSheets("map_interactions.png", "map_interactions.json");
	
	// Place the level on the scene
	Q.stageScene("level1", { sort: true });

	// Place the stats scene
	Q.stageScene("GameStats", 1);
}, {
	progressCallback: function(loaded,total) {
		//Progress Bar for loading assets
		Q.stage().items[1].p.w=(loaded/total)*960; 
  	}
});

// --------------- LEVELS ---------------

// Level 1

// Counter for the coins in level 1
var coins_level1 = 7;

Q.scene("level1", function(stage) {
	// Background layer
	var background = new Q.TileLayer({ dataAsset: "level1.tmx", layerIndex: 0, sheet: "tiles", tileW: 70, tileH: 70, type: Q.SPRITE_NONE, z: 1 });
	background.p.renderAlways = true;
	stage.insert(background);
	
	// Collision layer
	stage.collisionLayer(new Q.TileLayer({ dataAsset: "level1.tmx", layerIndex:1,  sheet: "tiles", tileW: 70, tileH: 70, z: 1, type: Q.SPRITE_DEFAULT | Q.SPRITE_ACTIVE | Q.SPRITE_COLLISION })); 
	
	// Add the player to the scene
	var player = stage.insert(new Q.Player());

	stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

	// Load various assets for this level (for example: coins, safe, enemies, etc...)
	stage.loadAssets("Level1_Data.json");

	// Play the main theme
	Q.audio.play("main_theme.wav", { loop: true });
});

// Level 2

// Max coins for level2
var coins_level2 = 8;

Q.scene("level2", function(stage) {
	// Background layer
	var background = new Q.TileLayer({ dataAsset: "level2.tmx", layerIndex: 0, sheet: "tiles", tileW: 70, tileH: 70, type: Q.SPRITE_NONE, z: 0 });
	stage.insert(background);

	// Collision layer
	var collision = stage.collisionLayer(new Q.TileLayer({ dataAsset: "level2.tmx", layerIndex:1,  sheet: "tiles", tileW: 70, tileH: 70, z: 0 })); 

	// Add the player to the scene
	var player = stage.insert(new Q.Player());
	stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

	// Load various assets for this level (for example: coins, safe, enemies, etc...)
	stage.loadAssets("Level2_Data.json");

	// Play the main theme
	Q.audio.play("main_theme.wav", { loop: true });
});

// Level 3

// Max coins for this level
var coins_level3 = 48;

Q.scene("level3", function(stage) {
	// Background layer
	var background = new Q.TileLayer({ dataAsset: "level3.tmx", layerIndex: 0, sheet: "tiles", tileW: 70, tileH: 70, type: Q.SPRITE_NONE, z: 0 });
	stage.insert(background);

	// Collision layer
	var collision = stage.collisionLayer(new Q.TileLayer({ dataAsset: "level3.tmx", layerIndex: 1,  sheet: "tiles", tileW: 70, tileH: 70, z: 0 })); 

	// Add the player to the scene
	var player = stage.insert(new Q.Player());

	// Reposition our player
	player.p.x = 175;
	player.p.y = 595;

	// Add a viewport to our player
	stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

	// Load various assets for this level (for example: coins, safe, enemies, etc...)
	stage.loadAssets("Level3_Data.json");

	// Play the main theme
	Q.audio.play("main_theme.wav", { loop: true });
});

// Level 4
Q.scene("level4", function(stage) {
	// Background layer
	var background = new Q.TileLayer({ dataAsset: "level4.tmx", layerIndex: 0, sheet: "tiles", tileW: 70, tileH: 70, type: Q.SPRITE_NONE, z: 0 });
	stage.insert(background);

	// Collision layer
	var collision = stage.collisionLayer(new Q.TileLayer({ dataAsset: "level4.tmx", layerIndex: 1,  sheet: "tiles", tileW: 70, tileH: 70, z: 0 })); 

	// Add the player to the scene
	var player = stage.insert(new Q.Player());

	// Reposition our player
	player.p.x = 1085;
	player.p.y = 1295;

	// Add a viewport to our player
	stage.add("viewport").follow(player, { x: true, y: true }, { minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h });

	// Load various assets for this level (for example: coins, safe, enemies, etc...)
	stage.loadAssets("Level4_Data.json");

	// Play the main theme
	Q.audio.play("main_theme.wav", { loop: true });
});

// --------------- STATS & SCENES ---------------

// Scene for the player stats
Q.scene("GameStats", function(stage) {
	// Cointainer for our stats
	var statsContainer = stage.insert(new Q.UI.Container({
			fill: "#4169E1",
			x: 300/2,
			y: 620,
			shadow: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			w: 350,
			h: 80
		})
	);
	
	// To display the lives
	var lives = stage.insert(new Q.UI.Button({
    	sheet: 'Hud_Lives3',
	    x: -100, // -420
	    y: -10
	}), statsContainer);	

	// Label for the lives
	var lbLives = stage.insert(new Q.UI.Text({
		label: "x 3",
		color: "red",
		x: -50, // -230
		y: -5
	}), statsContainer);

	// To display the keys
	var keyButton = stage.insert(new Q.UI.Button({
		sheet: "Hud_NoKey",
		x: 20, // -350
		y: -10
	}), statsContainer);
	
	// To display the coins
	// Button for the coins
	var coins = stage.insert(new Q.UI.Button({
		sheet: "Hud_Coins",
		x: 90, // -280
		y: -10
	}), statsContainer);

	// Label for the coins
	var lbCoins = stage.insert(new Q.UI.Text({
		label: "x 0",
		color: "yellow",
		x: 140, // -230
		y: -5
	}), statsContainer);
});

// End Level Scene
Q.scene("End_Level", function(stage) {
	// Cointainer for our stats
	var statsContainer = stage.insert(new Q.UI.Container({
			fill: "#4169E1",
			x: 960/2,
			y: 620/2,
			shadow: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			w: 400,
			h: 300
		})
	);

	//
	var lbFinished = stage.insert(new Q.UI.Text({
		label: "End Game Stats:",
		color: "yellow",
		x: -75,
		y: -125,
		shadow: 3,
		shadowColor: "rgba(0,0,0,0.5)"
	}), statsContainer);

	// To display the lives
	var lives = stage.insert(new Q.UI.Button({
    	sheet: 'Hud_Lives3',
	    x: -140,
	    y: -75
	}), statsContainer);	

	// Label for the lives
	var lbLives = stage.insert(new Q.UI.Text({
		label: "x 3",
		color: "red",
		x: -90,
		y: -75
	}), statsContainer);
	
	// To display the coins
	// Button for the coins
	var coins = stage.insert(new Q.UI.Button({
		sheet: "Hud_Coins",
		x: -140,
		y: -10
	}), statsContainer);

	// Label for the coins
	var lbCoins = stage.insert(new Q.UI.Text({
		label: "x 0",
		color: "yellow",
		x: -42,
		y: -10
	}), statsContainer);

	// Container for the button next
	// General button
	var btNext = stage.insert(new Q.UI.Button({
		fill: "yellow",
		x: -100,
		y: 80,
		w: 120,
		h: 80,
		shadow: 3,
		shadowColor: "rgba(0,0,0,0.5)"
	}, function() {

		// Stop all the sounds
		Q.audio.stop();

		// Get next level scene
		var nextLevel = current_level+1;
		var nextLevelName = getLevel(nextLevel);

		// Get our boosts

		// Reset the coins label
		var coinsLabel = Q("UI.Text", 1).items[1];
		coinsLabel.p.label = "x " + 0;

		// Reset the heart label
		var lifeImage = Q("UI.Button", 1).items[0];
		lifeImage.p.sheet = "Hud_Lives3";

		// On to the next level!
		Q.stageScene(nextLevelName, { sort: true });

		// Clear this window
		Q.clearStage(2);

	}), statsContainer);

	// Label for the name next
	var lbNext = stage.insert(new Q.UI.Text({
		label: "Next",
		color: "black",
		x: 0,
		y: 0
	}), btNext);

	// Container for the button retry
	// General button
	var btRetry = stage.insert(new Q.UI.Button({
		fill: "yellow",
		x: 100,
		y: 80,
		w: 120,
		h: 80,
		shadow: 3,
		shadowColor: "rgba(0,0,0,0.5)"
	}, function() {

		// Stop all the sounds
		Q.audio.stop();

		// Clear this window
		Q.clearStage(2);

		// Clear the level we are now
		Q.clearStage(0);

		// Stage the level we are in
		var currentLevelName = getLevel(current_level);
		Q.stageScene(currentLevelName, { sort: true });

	}), statsContainer);

	var lbRetry = stage.insert(new Q.UI.Text({
		label: "Retry",
		color: "black",
		x: 0,
		y: 0
	}), btRetry);

});

// Death Scene
Q.scene("Player_Death", function(stage) {
	// Cointainer for our labels
	var statsContainer = stage.insert(new Q.UI.Container({
			fill: "#4169E1",
			x: 960/2,
			y: 620/2,
			shadow: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			w: 300,
			h: 300
		})
	);

	// Label for congratulations
	var lbCongratulations = stage.insert(new Q.UI.Text({
		label: "You lost. Try again.",
		color: "yellow",
		x: 0,
		y: -60
	}), statsContainer);

	// Retry button
	var btRetry = stage.insert(new Q.UI.Button({
		fill: "yellow",
		x: 0,
		y: 60,
		w: 120,
		h: 80,
		shadow: 3,
		shadowColor: "rgba(0,0,0,0.5)"
	}, function() {

		// Stop all the sounds
		Q.audio.stop();

		// Clear this window
		Q.clearStage(2);

		// Clear the level we are now
		Q.clearStage(0);

		// Update the life label
		updateLabels(3);

		// Take the key away
		var keyImage = Q("UI.Button", 1).items[1];
		keyImage.p.sheet = "Hud_NoKey";

		// Reset the coins
		var coinsLabel = Q("UI.Text", 1).items[1];
		coinsLabel.p.label = "x " + 0;

		// Stage the level we are in
		var currentLevelName = getLevel(current_level);
		Q.stageScene(currentLevelName, { sort: true });
	}), statsContainer);

	var lbRetry = stage.insert(new Q.UI.Text({
		label: "Retry",
		color: "black",
		x: 0,
		y: 0
	}), btRetry);

});

// End Game Scene
Q.scene("End_Game", function(stage) {
	// Cointainer for our stats
	var statsContainer = stage.insert(new Q.UI.Container({
			fill: "#4169E1",
			x: 960/2,
			y: 620/2,
			shadow: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			w: 600,
			h: 500
		})
	);

	// Label for congratulations
	var lbCongratulations = stage.insert(new Q.UI.Text({
		label: "Congratulations! You finished the game.",
		color: "yellow",
		x: 0,
		y: 0
	}), statsContainer);

	var lbFinished = stage.insert(new Q.UI.Text({
		label: "Thank you for playing!",
		color: "yellow",
		x: 0,
		y: 50
	}), statsContainer);

});

// --------------- PLAYER ---------------

// "GLOBAL" variables for the player
var defaultSpeed = 200; // (default: 200)
var defaultJumpSpeed = -600;
var powerUpSpeed = 2;
var crouchSpeed = 100;

// Animations for the player (WARNING: p1_anim12 - needs to be pushed down to align with the other sprites)
Q.animations("Player_Animations", {
	stand: {
		frames: [0],
		rate: 1		
	},
	front: {
		frames: [11],
		rate: 1
	},
	run: {
		frames: [0, 1, 4, 3, 8, 7, 6, 9, 10],
		rate: 1/14,
		loop: false
	},
	jump: {
		frames: [12],
		rate: 1,
		next: "stand"
	},
	down: {
		frames: [13],
		rate: 1/18,
		next: "stand"
	},
	damage: {
		frames: [14],
		rate: 1,
		next: "stand"
	}
});

// Function to update the life label
function updateLabels(lives) {

	// Change the sheet depending on how many lives our player has
	switch(lives) {
		case 4:
			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
		case 3:
			// Reset the heart label
			var lifeImage = Q("UI.Button", 1).items[0];
			lifeImage.p.sheet = "Hud_Lives3";

			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
		case 2:
			// Change the sheet to the proper one
			var lifeImage = Q("UI.Button", 1).items[0];
			lifeImage.p.sheet = "Hud_Lives2";

			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
		case 1:
			// Change the sheet to the proper one
			var lifeImage = Q("UI.Button", 1).items[0];
			lifeImage.p.sheet = "Hud_Lives1";

			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
		case 0:
			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
		default:
			// Update our lives
			var lifeCount = Q("UI.Text", 1).items[0];
			lifeCount.p.label = "x " + lives;
			break;
	}
}
		
// Player object
Q.Sprite.extend("Player", {
	init: function(p) {
		// Define the sprite for this player
		this._super(p, { 
			sheet: "player", 
			sprite: "Player_Animations",
			frame: 11, 
			x: 140, 
			y: 450,
			z: 2,
			jumpSpeed: defaultJumpSpeed, 
			timeInvincible: 0, // if the player is invencible or not
			idleTime: 0.0, // for when the player is idle
			idle: false, // for when the player is idle
			jumping: false, // for when the player is jumping
			Coins: 0,
			YKey: false,
			Lives: 3,
			type: Q.SPRITE_DEFAULT | Q.SPRITE_ACTIVE | Q.SPRITE_COLLISION | Q.SPRITE_LADDER
		});
		this.add("2d, platformerControls, animation");

		// Verify if we hit an extra life boost
		this.on("hit.sprite", function(collision) {
			if(collision.obj.isA("Extra_Life")) {
				// Give us one more life
				this.p.Lives++;

				// Destroy our power up
				collision.obj.destroy();

				// Update the labels
				updateLabels(this.p.Lives);
			}
		});

		// Verify if we hit an immortality boost
		this.on("hit.sprite", function(collision) {
			if(collision.obj.isA("Immortality")) {
				// Give us 10 seconds of immortality
				this.p.timeInvincible = 10;

				// Destroy our power up
				collision.obj.destroy();
			}
		});

		// Verify if we hit a key
		this.on("hit.sprite", function(collision) {
			if(collision.obj.isA("Yellow_Key")) {
				// Destroy the key
				collision.obj.destroy();

				// Set that we have the key
				this.p.YKey = true;

				// Change the image on the label
				var keyImage = Q("UI.Button", 1).items[1];
				keyImage.p.sheet = "Hud_WithKey";
			}
		});

		// Verify if we hit a safe
		this.on("hit.sprite", function(collision) {
			if(collision.obj.isA("Yellow_Safe")) {
				if(this.p.YKey) {
					// Stop all the sounds
					Q.audio.stop();

					// Play the end level sound
					Q.audio.play("smb_stage_clear.wav");

					// Destroy the safe
					collision.obj.destroy();

					// Destroy the player
					this.destroy();

					// Update the label to take the key away
					var keyImage = Q("UI.Button", 1).items[1];
					keyImage.p.sheet = "Hud_NoKey";

					// Append the score scene
					Q.stageScene("End_Level", 2, { sort: true });

					// Get our lives
					var lifeLabel = Q("UI.Text", 2).items[1];
					lifeLabel.p.label = "x " + this.p.Lives;

					// Get our coins
					var coinsLabel = Q("UI.Text", 2).items[2];
					switch(current_level) {
						case 1:
							coinsLabel.p.label = "x " + this.p.Coins + " out of " + coins_level1;
							break;
						case 2:
							coinsLabel.p.label = "x " + this.p.Coins + " out of " + coins_level2;
							break;
						case 3:
							coinsLabel.p.label = "x " + this.p.Coins + " out of " + coins_level3;
							break;
					}
				}
			}
		});

		// If we are colliding with something
		this.on("hit", function(collision) {
			// If it's not an enemy
			if(!collision.obj.has("Common_Enemy")) {
				if(Q.inputs["up"] && this.p.vy == 0) {
					// Play the jump animation
					Q.audio.play("smb_jump-small.wav");
				}
			}
		});

	},
	step: function(dt) {
		// If our player isn't idle
		if(this.p.idle == false) {
			// When 10 seconds have passed
			if(this.p.idleTime >= 10) {
				// Set our player to idle
				this.p.idle = true;

				// Make it look at us
				this.play("front");

				// Reset the idleTime
				this.p.idleTime = 0.0;
			} else {
				this.p.idleTime = Math.max(this.p.idleTime + dt, 0);
			}
		}

		// Inputs
		if(Q.inputs["left"]) {
			if(this.p.direction == "right") {					
				// Flip
				this.p.flip = "x";
			}

			// Play the animation
			this.play("run");

			// We are no longer idle
			this.p.idle = false;
			this.p.idleTime = 0.0;
		}

		if(Q.inputs["right"]) {
			if(this.p.direction == "left") {
				// Don't flip
				this.p.flip = false;
			}

			// Play the animation
			this.play("run");

			// We are no longer idle
			this.p.idle = false;
			this.p.idleTime = 0.0;
		}

		if(Q.inputs["down"]) {
			// Animate the sprite when he looks down
			this.play("down");

			// We are no longer idle
			this.p.idle = false;
			this.p.idleTime = 0.0;

			// If the player is trying to move while crouched halve the speed
			if((Q.inputs["left"] || Q.inputs["right"]) && !this.p.jumping) {
				this.p.speed = crouchSpeed;
			}
		} else {
			// If he's not crouching give his speed back
			this.p.speed = defaultSpeed;
		}

		// ---------- JUMPING LOGIC ---------
		// See if we are colliding with a ladder
		var onLadder = this.stage.search(this, Q.SPRITE_LADDER);
		// See if we are on the ground
		if(Q.inputs["up"] || Q.inputs["action"]) {

			// If we are jumping and we are not climbing a ladder
			if(!this.p.jumping && !onLadder) {
				// We make it so we are jumping
				this.p.jumping = true;
			}

			// Make the climb
			if(onLadder) {
				// Play the jumping animation
				this.play("jump");
				// Take some y and vy
				this.p.y -= 5;
				this.p.vy = 0;
			}

			// We are no longer idle
			this.p.idle = false;
			this.p.idleTime = 0.0;
		}

		// If we are jumping play the animation
		if(this.p.jumping) {
			this.play("jump");
		}

		// If we aren't jumping and we aren't on a ladder
		if(this.p.vy == 0.0 && this.p.jumping == true) {
			this.p.jumping = false;
			this.play("stand");
		}
		// END OF JUMPING LOGIC

		// Minor fix so we don't fly off the upper part of the map
		if(this.p.y <= 24) {
			this.p.y = 24;
			this.p.vy = 0;
		}

		// Invencibility
		//this.p.timeInvincible = 1; // IMORTAL
		if(this.p.timeInvincible >= 0) {
			this.p.timeInvincible = Math.max(this.p.timeInvincible - dt, 0);
		} else if(this.p.timeInvincible < 0) {
			this.p.timeInvincible = 0;
		}
	},
	damage: function() {
		// Check if player isn't invencible
		if(this.p.timeInvincible <= 0) {
			// Take a life away from him
			this.p.Lives--;

			// If we are dead
			if(this.p.Lives <= 0) {
				// Stop all the sounds
				Q.audio.stop();

				// Play the end game sound
				Q.audio.play("smb_gameover.wav");

				// Destroy the player
				this.destroy();

				// Stage the lost scene
				Q.stageScene("Player_Death", 2);
			} else {
				// Play the damaged sound
				Q.audio.play("smb2_shrink.wav");
			}

			// Get our current ammount of lives
			var lives = this.p.Lives;

			// Set our time of invencibility
			this.p.timeInvincible = 1;
		
			// Play our damaged animation
			this.play("damage");

			// Throw the player up and backwards
			if(this.p.direction == "right") {
				// Knock back our player
				this.p.vy = -300;
				this.p.x -= 80;
			} else if(this.p.direction == "left") {
				// Knock back our player
				this.p.vy = -300;
				this.p.x += 80;
			}

			// Update labels
			updateLabels(lives);
		}
	}
});

// --------------- COINS ---------------

// Component for coins
Q.component("Coins_Comp", {
	added: function() {
		// This entity
		var entity = this.entity;
		// Perform the add a coin action only once
		var grantCoin = true;

		// Collision detection for this entity
		entity.on("bump.top, bump.left, bump.right, bump.bottom", function(collision) {
			if(collision.obj.isA("Player")) {
				// Play the coin sound
				Q.audio.play("smb_coin.wav");

				// Destroy the coin
				this.destroy();
				if(this.isA("BCoin")) {
					// Increment the number of coins we have
					if(grantCoin) {
						collision.obj.p.Coins++;
						grantCoin = false;
					}
				}
				if(this.isA("SCoin")) {
					// Increment the number of coins we have
					if(grantCoin) {
						collision.obj.p.Coins += 2;
						grantCoin = false;
					}
				}
				if(this.isA("GCoin")) {
					// Increment the number of coins we have
					if(grantCoin) {
						collision.obj.p.Coins += 4;
						grantCoin = false;
					}
				}

				// Put the number on the label
				var coinsLabel = Q("UI.Text", 1).items[1];
				coinsLabel.p.label = "x " + collision.obj.p.Coins;
			}
		});
	}
});

// Bronze coin object
Q.Sprite.extend("BCoin", {
	init: function(p) {
		this._super(p, {
			sheet: "BCoin",
			sensor: true,
			z: 1
		});
		this.add("2d, Coins_Comp");
	}
});

// Silver coin object
Q.Sprite.extend("SCoin", {
	init: function(p) {
		this._super(p, {
			sheet: "SCoin",
			sensor: true,
			z: 1
		});
		this.add("2d, Coins_Comp");
	}
});

// Gold coin object
Q.Sprite.extend("GCoin", {
	init: function(p) {
		this._super(p, {
			sheet: "GCoin",
			sensor: true,
			z: 1
		});
		this.add("2d, Coins_Comp");
	}
});


// --------------- KEYS ---------------

// Key object
Q.Sprite.extend("Yellow_Key", {
	init: function(p) {
		this._super(p, {
			sheet: "YKey",
			sensor: true,
			z: 1
		});
	}
});


// --------------- SAFE ---------------

// Safe object
Q.Sprite.extend("Yellow_Safe", {
	init: function(p) {
		this._super(p, {
			sheet: "YSafe",
			sensor: false,
			z: 1
		});
	}
});

//  --------------- BOOSTS ---------------

// Function to reset the boosts
function resetBoosts() {
	defaultSpeed = 200;
}

// Speed boost
Q.Sprite.extend("Speed_Boost", {
	init: function(p) {
		this._super(p, {
			sheet: "SpeedBoost",
			sensor: true,
			z: 1
		});

		// When hit
		this.on("sensor");
	},
	sensor: function() {
		// Play the power up sound
		Q.audio.play("smb_powerup.wav");

		// Destroy the speed boost
		this.destroy();

		// Double the players speed
		defaultSpeed *= powerUpSpeed;

		// Call the function to reset the speed after 2/3/4/5 seconds
		setTimeout(resetBoosts, 10000);
	}
});

// Life boost
Q.Sprite.extend("Extra_Life", {
	init: function(p) {
		this._super(p, {
			sheet: "Extra_Life",
			sensor: true,
			z: 1
		});

		// When hit
		this.on("sensor");
	},
	sensor: function() {
		// Play the 1 up life
		Q.audio.play("smb_1-up.wav");
	}
});

// Immortality
Q.Sprite.extend("Immortality", {
	init: function(p) {
		this._super(p, {
			sheet: "Immortality",
			sensor: true,
			z: 1
		});
	}
});

//  --------------- STAR ---------------
Q.Sprite.extend("Star", {
	init: function(p) {
		this._super(p, {
			sheet: "Star",
			sensor: true,
			z: 1,
			x: 1015, // Set at the middle of the stage
			y: 105, // Set at the middle of the stage
		});
		this.add("2d");

		// On sensor
		this.on("sensor");
	},
	sensor: function() {
		// Play the end game sound
		Q.audio.play("smb_world_clear.wav");

		// Destroy the star
		this.destroy();

		// Clear the stages
		Q.clearStage(0);
		Q.clearStage(1);
		Q.clearStage(2);

		// Append the endgame stage
		Q.stageScene("End_Game");
	}
});

//  --------------- MAP INTERACTIONS ---------------

// Global variables for the map interactions
var platformRange = 200;

// Mid Ladder object
Q.Sprite.extend("Ladder_Mid", {
	init: function(p) {
		this._super(p, {
			sheet: "LadderMid",
			sensor: true,
			z: 1,
			type: Q.SPRITE_LADDER
		});
	}
});

// Top Ladder object
Q.Sprite.extend("Ladder_Top", {
	init: function(p) {
		this._super(p, {
			sheet: "LadderTop",
			sensor: true,
			z: 1,
			type: Q.SPRITE_LADDER
		});
	}
});

// Moving platform
Q.Sprite.extend("Mov_Plat", {
	init: function(p) {
		this._super(p, {
			sheet: "mov_plat",
			vx: -100,
			rangeX: 0, // Added through JSON
			defaultDirection: "left",
			gravity: 0,
			z: 1
		});
		this.add("2d");

		// Starter X and Y position for calculations
		this.p.initialX = this.p.x;
		this.p.initialY = this.p.y;
	},
	step: function(dt) {
		// If our position (X = 200) minus our initial position (initialX = 0) is bigger or equal to the rangeX (200) 
		// and our velocity in X is greater than 0 (we are moving) we change direction
		if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0) {
			this.p.vx = -this.p.vx;
		} else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0) { // Same as above but in the opposite direction
			this.p.vx = -this.p.vx;
		}

		// Give us velocity again if we knock in to something
		if(this.p.defaultDirection == "right" && this.p.vx == 0) {
			this.p.vx = 100;
		} else if(this.p.vx == 0) {
			this.p.vx = -100;
		}

		// If we are displaced on our Y axis place us again
		if(this.p.y != this.p.initialY) {
			this.p.y = this.p.initialY;
		}
	}
});

//  --------------- ENEMIES ---------------

// Death animation
// Variable to store the entity before we kill it
var globalEntity;

// Function to call after we waited a set of time
function DestroyEntity() {
	globalEntity.destroy();
}

// Common enemy behavior component
Q.component("Common_Enemy", {
	added: function() {
		var entity = this.entity;

		// Collision detection for this entity
		entity.on("bump.left, bump.right, bump.bottom", function(collision) {
			if(collision.obj.isA("Player") && entity.p.killed == false) {
				// Destroy the player
				collision.obj.damage();

				// If we're a Fly add velocity so we don't get stuck
				if(this.isA("Fly")) {
					this.p.vy = -100;
					this.p.vy = -this.p.vy;
				}
			}
		});

		entity.on("bump.top", function(collision) {
			if(collision.obj.isA("Player") && entity.p.killed == false ) {
				// Play the stomp sound
				Q.audio.play("smb_stomp.wav");

				// Maker the player jump
				collision.obj.p.vy = -300;

				// Set us as the global entity
				globalEntity = this;

				// Set us as killed
				entity.p.killed = true;

				// Tween the death
				entity.animate({ x: this.p.x, y: this.p.y - 10, scale: 0, angle: 360 }, 0.5, Q.Easing.Quadratic.InOut, {
					callback: function() {
						// Destroy our sprite when we're done
						DestroyEntity();
					}
				});
			}
		});
		
	}
});

// Animations for the Fly(s)
Q.animations("Fly_Animations", {
	move: {
		frames: [0, 1],
		rate: 1/2
	},
	killed: {
		frames: [2],
		rate: 1
	}
});

// The Fly
Q.Sprite.extend("Fly", {
	init: function(p) {
		this._super(p, {
			sheet: "Fly",
			sprite: "Fly_Animations",
			frame: 0,
			vy: -100,
			rangeY: 100,
			gravity: 0,
			killed: false,
			z: 1,
			scale: 1
		});
		this.add("2d, Common_Enemy, animation, tween");

		// Starter Y position for calculations
		this.p.initialY = this.p.y;
	},
	step: function(dt) {
		
		// If our position (Y = 200) minus our initial position (initialY = 0) is bigger or equal to the rangeY (200) 
		// and our velocity in Y is greater than 0 (we are moving) we change direction
		if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
			this.p.vy = -this.p.vy;
		} else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) { // Same as above but in the opposite direction
			this.p.vy = -this.p.vy;
		}

		// Animate our fly!
		if(!this.p.killed) {
			this.play("move");
		} else {
			this.play("killed");
			this.p.vy = 0;
			this.p.vx = 0;
		}
	}
});

// The Quadratic Fly
Q.Sprite.extend("Quadratic_Fly", {
	init: function(p) {
		this._super(p, {
			sheet: "Fly",
			sprite: "Fly_Animations",
			frame: 0,
			vy: 400,
			vx: 100, // 100
			defaultDirection: "right",
			rangeX: 300,
			rangeY: 200,
			gravity: 0,
			killed: false,
			z: 1,
			scale: 1
		});
		this.add("2d, Common_Enemy, animation, tween");

		// Starter X and Y position for calculations
		this.p.initialX = this.p.x;
		this.p.initialY = this.p.y;
	},
	step: function(dt) {
		// Give her the velocity in case hit something
		if(this.p.vx == 0) {
			this.p.vx = 100;
		}
		if(this.p.vy == 0) {
			this.p.vy = 400;
		}

		// Flip the sprite
		if(this.p.vx > 0) {
			if(this.p.defaultDirection == "right") {
				this.p.flip = "x";
			} else {
				this.p.flip = false;
			}
		} else {
			if(this.p.defaultDirection == "left") {
				this.p.flip = "x";
			} else {
				this.p.flip = false;
			}
		}

		// Wave movement
		// Turn the fly if we hit the Y range
		if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
			this.p.vy = -this.p.vy;
			this.p.y += dt * this.p.vy;
		} else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) { // Same as above but in the opposite direction
			this.p.vy = -this.p.vy;
			this.p.y -= dt * this.p.vy;﻿
		}

		// Turn the fly if we hit the X range
		if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0) {
			this.p.vx = -this.p.vx;
		} else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0) { // Same as above but in the opposite direction
			this.p.vx = -this.p.vx;
		}
		// End of wave movement

		// Animate our fly!
		if(!this.p.killed) {
			this.play("move");
		} else {
			this.play("killed");
			this.p.vy = 0;
			this.p.vx = 0;
		}
	}
});

// Animations for the Slime(s)
Q.animations("Slime_Animations", {
	move: {
		frames: [4, 3],
		rate: 1/2
	},
	killed: {
		frames: [5],
		rate: 1
	}
});

// The Slime
Q.Sprite.extend("Slime", {
	init: function(p) {
		this._super(p, {
			sheet: "Slime",
			sprite: "Slime_Animations",
			frame: 4,
			vx: -100,
			defaultDirection: "left",
			killed: false,
			z: 1,
			scale: 1
		});
		this.add("2d, aiBounce, Common_Enemy, animation, tween");
	},
	step: function(dt) {        
		var dirX = this.p.vx/Math.abs(this.p.vx);
		var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
		var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
		
		/// If the sprite is on the ground and we don't have a next tile (empty space)
		if(!nextTile && ground && !this.p.killed) {
			if(this.p.vx > 0) {
				if(this.p.defaultDirection == "right") {
					this.p.flip = "x";
				} else {
					this.p.flip = false;
				}
			} else {
				if(this.p.defaultDirection == "left") {
					this.p.flip = "x";
				} else {
					this.p.flip = false;
				}
			}
			this.p.vx = -this.p.vx;
		}

		// Animate our slime!
		if(!this.p.killed) {
			// If we weren't killed yet
			this.play("move");
		} else {
			// When we are killed play the killed animation and stop the object from moving
			this.play("killed");
			this.p.vx = 0;
			this.p.vy = 0;
		}
	}
});

// Animations for the Snail(s)
Q.animations("Snail_Animations", {
	move: {
		frames: [0, 1],
		rate: 1/2
	},
	killed: {
		frames: [2],
		rate: 1
	}
});

// Snails
Q.Sprite.extend("Snail", {
	init: function(p) {
		this._super(p, {
			sheet: "Snail",
			sprite: "Snail_Animations",
			frame: 0,
			vx: 0,
			defaultDirection: "left",
			killed: false,
			dashTimer: 0, // Time we wait before we dash
			dash: 0, // Time we spend dashing
			dashRange: 300, // The distance we dash that is basically the speed in the X axis
			z: 1,
			scale: 1
		});
		this.add("2d, aiBounce, Common_Enemy, animation, tween");
	},
	step: function(dt) {
		// Dashing
		// When 2 seconds have passed and if we aren't moving
		if(this.p.dashTimer >= 2 && this.p.dash == 0) {
			// Set our dash time to 1 second
			this.p.dash = 1;

			// Flip our sprite
			if(this.p.defaultDirection == "right") {
				// Dash speed of 80
				this.p.vx += this.p.dashRange;
			} else if(this.p.defaultDirection == "left") {
				// Dash speed of 80
				this.p.vx -= this.p.dashRange;
			}

			// Reset the dashTimer
			this.p.dashTimer = 0.0;
		} else if(this.p.dash == 0) {
			// Count the timer
			this.p.dashTimer = Math.max(this.p.dashTimer + dt, 0);
		}

		// Stop our sprite from dashing
		if(this.p.dash == 0.0) {
			this.p.vx = 0;
		} else if(this.p.dash <= 1) {
			// Count until one second is out
			this.p.dash = Math.max(this.p.dash - dt, 0);	
		}

		// Flip the snail when we stop dashing
		if(this.p.vx == 0 && this.p.defaultDirection == "right") {
			this.p.flip = "x";
		} else if(this.p.vx == 0) {
			this.p.flip = false;
		}

		// Animate our snail!
		if(!this.p.killed) {
			// If we weren't killed yet
			this.play("move");
		} else {
			// When we are killed play the killed animation and stop the object from moving
			this.play("killed");
			this.p.vx = 0;
			this.p.vy = 0;
		}
	}
});

// Animations for the Blocker(s)
Q.animations("Blocker_Animations", {
	wait: {
		frames: [0],
		rate: 1
	},
	jump: {
		frames: [1],
		rate: 1
	}
});

// Blockers
Q.Sprite.extend("Blocker", {
	init: function(p) {
		this._super(p, {
			sheet: "Blocker",
			sprite: "Blocker_Animations",
			killed: false,
			jumpTimer: 0,
			z: 1,
			scale: 1
		});
		this.add("2d, aiBounce, animation, tween");

		// If the player hits us on the top
		this.on("bump.top", function(collision) {
			if(collision.obj.isA("Player") && this.p.vy >= 0) {
				// Play the stomp sound
				Q.audio.play("smb_stomp.wav");

				// Maker the player jump
				collision.obj.p.vy = -300;

				// Tween the death
				this.animate({ x: this.p.x, y: this.p.y - 10, scale: 0, angle: 360 }, 0.5, Q.Easing.Quadratic.InOut, {
					callback: function() {
						// Destroy the blocker
						this.destroy();
					}
				});
			} else if(collision.obj.isA("Player") && this.p.vy < 0) {
				// Play the die sound
				Q.audio.play("smb_mariodie.wav");

				// Kill the player
				collision.obj.destroy();
			}
		});

		// If the player hits from bellow and we are falling we kill him
		this.on("bump.bottom", function(collision) {
			if(collision.obj.isA("Player") && this.p.vy >= 0) {
				// Play the die sound
				Q.audio.play("smb_mariodie.wav");

				// Kill the player
				collision.obj.destroy();
			}
		});
	},
	step: function(dt) {
		// Jumping
		// Wait 2 seconds before we jump
		if(this.p.jumpTimer >= 2) {
			// We animate the angry jump
			this.play("jump");

			// After we waited 2 seconds we jump
			this.p.vy = -800;

			// Reset the jump timer
			this.p.jumpTimer = 0;
		} else if(this.p.vy == 0) {
			// We go back to our animation
			this.play("wait");

			// If we have hit the ground we count up
			this.p.jumpTimer = Math.max(this.p.jumpTimer + dt, 0);
		}
	}
});

// Big Fluffy Fly (Boss)
Q.Sprite.extend("Big_Fluffy_Fly", {
	init: function(p) {
		this._super(p, {
			sheet: "Fly",
			sprite: "Fly_Animations",
			frame: 0,
			vx: -100,
			rangeX: 200,
			gravity: 0,
			killed: false,
			defaultDirection: "left",
			scale: 6, // So we are big (default: 6)
			Lives: 3, // Are lives
			stage: 1, // Our behavior (default: 1)
			timeInvincible: 0,
			dashTimer: 0, // Our timer we "charge" before we dash
			dashStopTimer: 1, // For how many seconds are going to be dashing
			dash: false, // If we are dashing our not
			dashRange: 900, // Our dash speed (which defines our range)
			tween: false, // If we are tweening our vertical movement
			tweenVerticalDirection: true, // true is down, false is up
			z: 1
		});
		this.add("2d, animation, tween");

		// Start Y
		this.p.initialX = this.p.x;

		// Big Fluffy behavior
		// If we or the player hit us on the sides/bottom
		this.on("bump.bottom, bump.left, bump.right", function(collision) {
			if(collision.obj.isA("Player")) {
				// Destroy the player
				collision.obj.damage();

				// Add velocity to ourselves so we don't get stuck
				if(this.p.stage == 1) {
					this.p.vy = -100;
					this.p.vy = -this.p.vy;	
				}
			}
		});

		// If the player hit us on the top
		this.on("bump.top", function(collision) {
			if(collision.obj.isA("Player")) {
				// Make the player jump
				collision.obj.p.vy -= 600;

				// Reduce our size
				this.damage();
			}
		});

	},
	step: function(dt) {

		// We act differently according to the stage in which we are in
		switch(this.p.stage) {
			case 1:

				// If our position (Y = 200) minus our initial position (initialY = 0) is bigger or equal to the rangeY (200) 
				// and our velocity in Y is greater than 0 (we are moving) we change direction
				if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0) {
					this.p.vx = -this.p.vx;
					this.p.flip = false;
				} else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0) { // Same as above but in the opposite direction
					this.p.vx = -this.p.vx;
					this.p.flip = "x";
				}
				break;
			case 2:
				// When 2 seconds have passed and if we aren't moving
				if(this.p.dashTimer >= 2 && this.p.dash == false && this.p.tween == false) {
					// Set our dash to true
					this.p.dash = true;

					// Dash our sprite
					if(this.p.defaultDirection == "left") {
						// Add our dash speed
						this.p.vx -= this.p.dashRange;
					} else if(this.p.defaultDirection == "right") {
						// Add our dash speed
						this.p.vx += this.p.dashRange;
					}

					// Reset the dashTimer
					this.p.dashTimer = 0.0;

					// Set our dash stop timer to 1 second
					this.p.dashStopTimer = 1;
				} else if(this.p.dash == false && this.p.tween == false) {
					// Count the timer
					this.p.dashTimer = Math.max(this.p.dashTimer + dt, 0);
				}

				// Take time from our dashStopTimer until it's 0
				if(this.p.dashStopTimer <= 1 && !(this.p.dashStopTimer <= 0.0) && this.p.dash == true && this.p.tween == false) {
					// Take time from our dash stop timer
					this.p.dashStopTimer = Math.max(this.p.dashStopTimer - dt, 0);
				} else if(this.p.dashStopTimer <= 0.0 && this.p.dash == true && this.p.tween == false) {
					// When our time reaches 0 call the stopDash function so we effectively stop dashing
					this.stopDash();
				}
				break;
			case 3:
				// Give her the velocity in case hit something
				if(this.p.vx == 0) {
					this.p.vx = 100;
				}
				if(this.p.vy == 0) {
					this.p.vy = 400;
				}

				// Flip the sprite
				if(this.p.vx > 0) {
					if(this.p.defaultDirection == "right") {
						this.p.flip = "x";
					} else {
						this.p.flip = false;
					}
				} else {
					if(this.p.defaultDirection == "left") {
						this.p.flip = "x";
					} else {
						this.p.flip = false;
					}
				}

				// Wave movement
				// Turn the fly if we hit the Y range
				if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
					this.p.vy = -this.p.vy;
					this.p.y += dt * this.p.vy;
				} else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) { // Same as above but in the opposite direction
					this.p.vy = -this.p.vy;
					this.p.y -= dt * this.p.vy;﻿
				}

				// Turn the fly if we hit the X range
				if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0) {
					this.p.vx = -this.p.vx;
				} else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0) { // Same as above but in the opposite direction
					this.p.vx = -this.p.vx;
				}
				// End of wave movement
				break;
		}

		// Animate our fly!
		if(!this.p.killed) {
			this.play("move");
		} else {
			this.play("killed");
			this.p.vy = 0;
			this.p.vx = 0;
		}

		// Invencibility
		//this.p.timeInvincible = 1; // IMORTAL
		if(this.p.timeInvincible >= 0) {
			this.p.timeInvincible = Math.max(this.p.timeInvincible - dt, 0);
		} else if(this.p.timeInvincible < 0) {
			this.p.timeInvincible = 0;
		}
	},
	damage: function() {

		// If we aren't invencible
		if(this.p.timeInvincible <= 0) {
			// Play the stomp sound
			Q.audio.play("smb_stomp.wav");

			// Make us invencible for 4 seconds (the time the tween animation needs to finish)
			this.p.timeInvincible = 4;

			// Take a life
			this.p.Lives--;

			// Reset our velocity
			this.p.vy = 0;
			this.p.vx = 0;

			// Change our behavior
			this.p.stage++;

			// Reposition our big fluffy fly
			if(this.p.stage == 2) {
				this.p.x = 1505;
				this.p.y = 245;
			} else if(this.p.stage == 3) {
				// Reset our velocity and range
				this.p.rangeY = 400;
				this.p.rangeX = 500;
				this.p.vy = 400;
				this.p.vx = 100;
				
				this.p.x = 1050;
				this.p.y = 630;

				// Set our start Y and X
				this.p.initialY = 630;
				this.p.initialX = 1050;
			}

			// Victory!
			if(this.p.Lives <= 0) {
				// Stop all audio
				Q.audio.stop();

				// Destroy the big fluffy fly
				this.destroy();

				// Win the game (change to make a little star appear and when touched the game ends)
				var star = new Q.Star();

				// Add it to the scene
				Q.stage(0).insert(star);
			}

			// Reduce our scale size
			this.p.scale -= 2;
		}
	},
	stopDash: function() {
		// Stop us from dashing
		this.p.dash = false;

		// Reset our dash stop timer
		this.p.dashStopTimer = 0.0;

		// Take our velocity
		this.p.vx = 0;

		// Flip the sprite
		if(this.p.defaultDirection == "left") {
			this.p.flip = "x";
			this.p.defaultDirection = "right"; 
		} else if(this.p.defaultDirection == "right") {
			this.p.flip = false;
			this.p.defaultDirection = "left";
		}

		// Set our tween to false
		this.p.tween = false;

		// Tween our vertical movement
		// If we can go down and our direction is down
		if((this.p.y + 350) < 1295 && this.p.tweenVerticalDirection == true) {
			// Set our tween to true
			this.p.tween = true;

			// We move down
			this.animate({ x: this.p.x, y: (this.p.y + 350) }, 4, Q.Easing.Quadratic.InOut, { callback: function() { 
				// We allow the behavior to continue
				this.p.tween = false;

				// If after we finish the animation we are on stage 3
				if(this.p.stage == 3) {

					// Flip the sprite if we need to
					if(this.p.defaultDirection == "left") {
						this.p.flip = "x";
						this.p.defaultDirection = "right";
					}

					// Reset our velocity and range
					this.p.rangeY = 400;
					this.p.rangeX = 500;
					this.p.vy = 400;
					this.p.vx = 100;

					// Position our boss
					this.p.x = 1050;
					this.p.y = 70;

					// Set our start Y and X
					this.p.initialY = 630;
					this.p.initialX = 1050;
				}
			} });
		} else {
			// If we can't go down or our direction isn't down we set our direction to up
			this.p.tweenVerticalDirection = false;
		}

		// If we can go up and our direction is up
		if((this.p.y - 350) >= 245 && this.p.tweenVerticalDirection == false) {
			// Set our tween to true
			this.p.tween = true;

			// We move up
			this.animate({ x: this.p.x, y: (this.p.y - 350) }, 4, Q.Easing.Quadratic.InOut, { callback: function() { this.p.tween = false; } });
		} else {
			// If we can't go up or direction isn't up we set our direction to down
			this.p.tweenVerticalDirection = true;
		}
	}
});

//  --------------- TRAPS ---------------

// Common trap behavior component
Q.component("Common_Trap", {
	added: function() {
		var entity = this.entity;

		// Collision detection for this entity
		entity.on("bump.left, bump.right, bump.top, bump.bottom", function(collision) {
			if(collision.obj.isA("Player")) {
				// Damage the player
				collision.obj.damage();
			}
		});
	}
});

// Lava trap
Q.Sprite.extend("Lava_Trap", {
	init: function(p) {
		this._super(p, {
			sheet: "lava",
			z: 1
		});
		this.add("2d, Common_Trap");
	},
	step: function(dt) {
	}
});

// Spike trap
Q.Sprite.extend("Spike_Trap", {
	init: function(p) {
		this._super(p, {
			sheet: "spike",
			z: 1
		});
		this.add("2d, Common_Trap");
	},
	step: function(dt) {

	}
});