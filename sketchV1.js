let sprite;
let building;
let Rat1Direction, Rat2Direction, Rat3Direction, Rat4Direction;
let lev1, lev2, lev3, lev4, lev5, lev6, lev7, lev8; 
let levels = [];
let prop;
let props = []; // array to store props that spawn on click
let lifts = []; // array to store lift data
let liftdown, liftUp;

function setup() {
	new Canvas(windowWidth, windowHeight);
	/*new Canvas(1080, 1920);*/
	allSprites.pixelPerfect = true;

	// Create building sprite group
	building = createSprite(width/2, height/2, width/2, height)
	building.collider = "static";
	building.shape = "chain";
    building.stroke = 'black';
	
	//Create Level Offset Variables
	const levelHeight = building.height/8;
	const levelOffset = building.y+(building.y/1.14)

	//Create 8 Levels 
	lev1 = createSprite(building.width, levelOffset, building.width+4, building.height/8)
	lev1.collider = "static";
	lev1.shape = "chain";
	lev1.stroke = 'orange';

	lev2 = createSprite(building.width, levelOffset-levelHeight, building.width+4, building.height/8)
	lev2.collider = "static";
	lev2.shape = "chain";
	lev2.stroke = 'red';

	lev3 = createSprite(building.width, levelOffset-levelHeight*2, building.width+4, building.height/8)
	lev3.collider = "static";
	lev3.shape = "chain";
	lev3.stroke = 'purple';

	lev4 = createSprite(building.width, levelOffset-levelHeight*3, building.width+4, building.height/8)
	lev4.collider = "static";
	lev4.shape = "chain";
	lev4.stroke = 'hotpink';

	lev5 = createSprite(building.width, levelOffset-levelHeight*4, building.width+4, building.height/8)
	lev5.collider = "static";
	lev5.shape = "chain";
	lev5.stroke = 'blue';

	lev6 = createSprite(building.width, levelOffset-levelHeight*5, building.width+4, building.height/8)
	lev6.collider = "static";
	lev6.shape = "chain";
	lev6.stroke = 'darkblue';

	lev7 = createSprite(building.width, levelOffset-levelHeight*6, building.width+4, building.height/8)
	lev7.collider = "static";
	lev7.shape = "chain";
	lev7.stroke = 'green';

	lev8 = createSprite(building.width, levelOffset-levelHeight*7, building.width+4, building.height/8)
	lev8.collider = "static";
	lev8.shape = "chain";
	lev8.stroke = 'lime';

	// Rat1 SETUP
    Rat1 = new Sprite(10, 10);
	Rat1.width = building.height/64;
	Rat1.height = building.height/64;
	Rat1.image = 'sprites/rat_test.gif';
	Rat1.image.offset.y = -40;
	Rat1.image.scale = 0.3;
	Rat1.color = "red";
	/*Rat1.text = "1";*/
	Rat1.rotationLock = true;
    Rat1.x = building.width-(building.width/8);
    Rat1.y = levelOffset-levelHeight*0+(levelHeight/2.25);
    Rat1Direction = 'right'; // 1 = right, -1 = left

	// Rat2 SETUP
    Rat2 = new Sprite(10, 10);
	Rat2.width = building.height/64;
	Rat2.height = building.height/64;
	Rat2.image = 'sprites/rat_test.gif';
	Rat2.image.offset.y = -70;
	Rat2.image.scale = 0.3;
	Rat2.color = "blue";
	Rat2.text = "2";
	Rat2.rotationLock = true;
    Rat2.x = building.width-(building.width/6);
    Rat2.y = levelOffset-levelHeight*0+(levelHeight/2.25);
    Rat2Direction = 'left'; // 1 = right, -1 = left	

	// Rat3 SETUP
    Rat3 = new Sprite(10, 10);
	Rat3.width = building.height/64;
	Rat3.height = building.height/64;
	Rat3.image = 'sprites/rat_test.gif';
	Rat3.image.offset.y = -40;
	Rat3.image.scale = 0.3;
	Rat3.color = "yellow";
	Rat3.text = "3";
	Rat3.rotationLock = true;
    Rat3.x = building.width+(building.width/6);
    Rat3.y = levelOffset-levelHeight*0+(levelHeight/2.25);
    Rat3Direction = 'right'; // 1 = right, -1 = left	

	// Rat4 SETUP
    Rat4 = new Sprite(10, 10);
	Rat4.width = building.height/64;
	Rat4.height = building.height/64;
	Rat4.image = 'sprites/rat_test.gif';
	Rat4.image.offset.y = -40;
	Rat4.image.scale = 0.3;
	Rat4.color = "green";
	Rat4.text = "4";
	Rat4.rotationLock = true;
    Rat4.x = building.width+(building.width/6);
    Rat4.y = levelOffset-levelHeight*0+(levelHeight/2.25);
    Rat4Direction = 'left'; // 1 = right, -1 = left	

	// Create Props Group
	prop = new Group();
	prop.collider = "dynamic";
	prop.friction = 0;
    prop.color = 'grey';

	//spawn X amt of props on startup
	// Spawn props on levels 1 and 2
	spawnLifts(1, [lev1, lev2, lev3, lev4, lev5, lev6, lev7, lev8]); // Spawn UP elevator on each level
	spawnProps(8, [lev1, lev2, lev3, lev4, lev5, lev6, lev7, lev8]); // Spawn x amt props on each level
}

	//Prop Generator function
	  function spawnProps(numProps, levels) {
		for (let level of levels) {
		  for (let i = 0; i < numProps; i++) {
			// Calculate a random x-position within the level's width
			let propX = random(level.x - level.width / 2.1, level.x + level.width / 2.1);
			let propY = random(level.y - level.height / 2, level.y + level.height / 2);
	  
			// Check if the prop would overlap with any existing lifts or props
			let overlap = false;
			for (let lift of lifts) {
			  if (dist(propX, propY, lift.up.x, lift.up.y) < (level.width/16 + 10) ||
				  dist(propX, propY, lift.down.x, lift.down.y) < (level.width/16 + 10)) {
				overlap = true;
				break;
			  }
			}
			for (let existingProp of props) {
			  if (dist(propX, propY, existingProp.x, existingProp.y) < (10 + existingProp.width)) {
				overlap = true;
				break;
			  }
			}
	  
			// Check if the prop would spawn inside an elevator
			for (let lift of lifts) {
			  if (propX > lift.up.x - lift.up.width/5 && propX < lift.up.x + lift.up.width/5 &&
				  propY > lift.up.y - lift.up.height/5 && propY < lift.up.y + lift.up.height/5) {
				overlap = true;
				break;
			  }
			  if (propX > lift.down.x - lift.down.width/5 && propX < lift.down.x + lift.down.width/5 &&
				  propY > lift.down.y - lift.down.height/5 && propY < lift.down.y + lift.down.height/5) {
				overlap = true;
				break;
			  }
			}
	  
			// If the prop would not overlap, create it
			if (!overlap) {
			  prop = createSprite(propX, propY, 10, 10);
			  prop.image = '../sprites/prop_' + floor(random(1, 5))+ '.png';
			  prop.overlaps(Rat1); prop.overlaps(Rat2); prop.overlaps(Rat3); prop.overlaps(Rat4);
			  prop.friction = 10;
			  prop.velocity.y = 1;
			  prop.velocity.x = floor(random(1,3));
			  prop.bounciness = 0.2;
			  prop.rotationLock = true;
			  prop.layer = 4;
			  props.push(prop);
			} else {
			  // If the prop would overlap, try again
			  i--;
			}
		  }
		}
	  }

	//Lifts Generator
	function spawnLifts(numProps, levels) {
		for (let level of levels) {
		  for (let i = 0; i < numProps; i++) {
			// Calculate a random x-position within the level's width
			let liftX = random(level.x - level.width / 2.3, level.x + level.width / 2.3);

            // Create a "Lift Up" sprite
            let liftUp = createSprite(liftX, level.y + windowHeight/32, 32, 48 /*level.width/16, level.height/64*/);
			liftUp.addCollider(25, 25);
			liftUp.addSensor(50,50);
			liftUp.debug = true
			liftUp.push = 'lifts';

			// Lift Up Sprite Ani. Settings
			liftUp.spriteSheet = 'sprites/tileset_elevator.png';
			liftUp.anis.offset.y = 10;
            liftUp.anis.frameDelay = 50;
			liftUp.anis.frameSize = 32,48;
			liftUp.rotationLock = true;
			liftUp.mass = 1000;
			liftUp.scale = 1.6;
			liftUp.layer = 2;
		
			liftUp.addAnis({
				open: { row: 0, frames: 5 }
			});
			liftUp.changeAni('open');
			

			// Lift Up Properties
            liftUp.text = "UP"; liftUp.layer = 2; liftUp.collider = "dynamic";
            liftUp.overlaps(Rat1); liftUp.overlaps(Rat2); liftUp.overlaps(Rat3); liftUp.overlaps(Rat4);

            // Calculate a new x-position for the "Lift Down" sprite, ensuring a minimum distance from the "Lift Up" sprite
            let liftDownX = liftX + (liftUp.width + 300); // adjust the minimum distance as needed
            if (liftDownX > level.x + level.width / 2.3) {
            liftDownX = liftX - (liftUp.width + 10); // wrap around to the left if necessary
     }

            // Create a "Lift Down" sprite
            let liftdown = createSprite(liftDownX, level.y + windowHeight/32, 32, 48 /*level.width/16, level.height/2*/);
			liftdown.addCollider(25, 25);
			liftUp.addSensor(50,50);
			liftdown.debug = true;
            liftdown.push = 'lifts';
			

			// Lift Down Sprite Ani. Settings
			liftdown.spriteSheet = 'sprites/tileset_elevator.png';
			liftdown.anis.offset.y = 10;
			liftdown.anis.frameDelay = 50;
			liftdown.anis.frameSize = 32,48;
			liftdown.rotationLock = true;
			liftdown.mass = 1000;
			liftdown.scale = 1.6;
			liftdown.layer = 2;
					
			liftdown.addAnis({
			open: { row: 0, frames: 5 }
			});
			liftdown.changeAni('open');

            liftdown.text = "DOWN"; liftdown.collider = "dynamic";
            liftdown.overlaps(Rat1); liftdown.overlaps(Rat2); liftdown.overlaps(Rat3); liftdown.overlaps(Rat4);
		  }
		}
	  }

	  function draw() {
		background('white');
		
		//initialize world variables & layer structure
		world.gravity.y = 10;
		Rat1.overlaps(Rat2); Rat1.overlaps(Rat3); Rat1.overlaps(Rat4);
		Rat2.overlaps(Rat3); Rat2.overlaps(Rat4); Rat3.overlaps(Rat4); 
	
		// Layer 5 is top ( rat players )
		Rat1.layer = 5; Rat2.layer = 5; Rat3.layer = 5; Rat4.layer = 5; 
		// Layer 4 is props ( office equipment )
		// Layer 3 is for hostiles ( obstacles )
		// Layer 2 is for building 
		// Layer 1 is for background
	
		// Rat1 DRAW
		//Move Rat
		if (Rat1Direction === 'right') {
			Rat1.direction = 0;
			Rat1.speed = 3;
		} else if (Rat1Direction === 'left') {
			Rat1.direction = 180;
			Rat1.speed = 2; }
		// Check for collision with the building
		if (Rat1.collides(building)) {
		// Move the block away from the building to prevent sticking
		if (Rat1Direction === 'right') {
			Rat1.mirror.x = false;
			Rat1.x -= 10;
		} else if (Rat1Direction === 'left') {
			Rat1.mirror.x = true;
			Rat1.x += 10; }
		// Reverse the block direction
		Rat1Direction = Rat1Direction === 'right' ? 'left' : 'right'; }
	
		// Rat2 DRAW
		//Move Rat
		if (Rat2Direction === 'right') {
			Rat2.direction = 0;
			Rat2.speed = 2;
		} else if (Rat2Direction === 'left') {
			Rat2.direction = 180;
			Rat2.speed = 3; }
		// Check for collision with the building
		if (Rat2.collides(building)) {
		// Move the block away from the building to prevent sticking
		if (Rat2Direction === 'right') {
			Rat2.mirror.x = false;
			Rat2.x -= 10;
		} else if (Rat2Direction === 'left') {
			Rat2.mirror.x = true;
			Rat2.x += 10; }
		// Reverse the block direction
		Rat2Direction = Rat2Direction === 'right' ? 'left' : 'right'; }
	
		// Rat3 DRAW
		//Move Rat
		if (Rat3Direction === 'right') {
			Rat3.direction = 0;
			Rat3.speed = 2;
		} else if (Rat3Direction === 'left') {
			Rat3.direction = 180;
			Rat3.speed = 2; }
		// Check for collision with the building
		if (Rat3.collides(building)) {
		// Move the block away from the building to prevent sticking
		if (Rat3Direction === 'right') {
			Rat3.mirror.x = false;
			Rat3.x -= 12;
		} else if (Rat3Direction === 'left') {
			Rat3.mirror.x = true;
			Rat3.x += 11; }
		// Reverse the block direction
		Rat3Direction = Rat3Direction === 'right' ? 'left' : 'right'; }
	
		// Rat4 DRAW
		//Move Rat
		if (Rat4Direction === 'right') {
			Rat4.direction = 0;
			Rat4.speed = 2;
		} else if (Rat4Direction === 'left') {
			Rat4.direction = 180;
			Rat4.speed = 2; }
		// Check for collision with the building
		if (Rat4.collides(building)) {
		// Move the block away from the building to prevent sticking
		if (Rat4Direction === 'right') {
			Rat4.mirror.x = false;
			Rat4.x -= 10;
		} else if (Rat4Direction === 'left') {
			Rat4.mirror.x = true;
			Rat4.x += 15; }
		// Reverse the block direction
		Rat4Direction = Rat4Direction === 'right' ? 'left' : 'right'; }
	
	   //Spawn Props on Click
		if (mouse.presses()) new prop.Sprite(mouse.x, mouse.y, building.height/128, building.height/128);
		prop.image = '../images/vending.png';
		prop.image.scale = 0.8;
		prop.image.offset.y = -10;
		prop.rotationLock = true;
		prop.overlaps(Rat1); prop.overlaps(Rat2); prop.overlaps(Rat3); prop.overlaps(Rat4); prop.layer = 4;

		if (Rat1.overlaps(liftUp)) {
			Rat1.x = Rat.x - level.height*2;
	}
}