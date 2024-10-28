let sprite;
let building;
let Rat1Direction, Rat2Direction, Rat3Direction, Rat4Direction;
let lev1, lev2, lev3, lev4, lev5, lev6, lev7, lev8; 
let levels = [];
let props = []; // array to store props that spawn on click
let lifts = []; // array to store lift data
let up; let down;
let lastMoveTime = 0; let cooldownTime = 0;
let ani; let ani2; let idle;
let intialisation = 0;

function preload() {
	font = loadFont('nitw.otf');
}

function setup() {
	/*new Canvas(windowWidth, windowHeight);*/
	new Canvas(1080, 1440, 'fullscreen');
	frameRate(60); 
	textFont(font);
	p5play.renderStats = true;
    allSprites.pixelPerfect = true;

	ani = loadAni('sprites/liftseq1.png', 5);
	ani2 = loadAni('sprites/liftseq1.png', 5);
	idle = loadAni('sprites/liftidle1.png', 1);

	// Create building sprite group
	building = createSprite(width/2, height/2, width/2, height);
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
	lev1.stroke = 'black';

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
	Rat1.image.offset.y = -70;
	Rat1.image.scale = 0.3;
	Rat1.color = "red";
	Rat1.debug = true;
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
	Rat2.frameDelay = 600;
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

	//spawn X amt of props on startup, cue props & lift

	//( up ) - create 8x Lifts
	up = new Group();
	up.image = 'sprites/invis.png';
	//Older Animation Initialisation Iterations
	/*upAni = loadAni('sprites/liftseq1.png', 5);*/
    /*up.addAni ('sprites/lift.gif');*/


	up.width = 32;
	up.height = 48;
    up.x = (i) => random((building.width + 100), (building.width - 100));
	up.y = (i) => (building.height/8) * i + building.height/4.1;
	up.amount = 7;
	

	/*up.x = (i) => random((building.width + 100), (building.width - 100));
	up.y = (i) => (building.height/8) * i + building.height/10;
	up.amount = 8;*/

	up.layer = 1;
	up.collider = "dynamic";
	up.rotationLock = true;
	up.mass = 500;
	up.overlaps(Rat1);up.overlaps(Rat2);up.overlaps(Rat3);up.overlaps(Rat4);
	up.text = (i) => i + " UP";

    //( down ) - create 8x Lifts
	down = new Group();
	down.width = 32;
    down.height = 48;
	down.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	down.y = (i) => (building.height/8) * i + building.height/8;
	down.amount = 7;
	/*down.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	down.y = (i) => (building.height/8) * i + building.height/10;
	down.amount = 8;*/

	down.layer = 2;
	down.collider = "dynamic";
	down.rotationLock = true;
	down.mass = 500;
	down.overlaps(Rat1);down.overlaps(Rat2);down.overlaps(Rat3);down.overlaps(Rat4);
	down.text = (i) => i + " DOWN";

	//( props ) - create 8 props per level 
	props = new Group();
	props.overlaps(Rat1);props.overlaps(Rat2);props.overlaps(Rat3);props.overlaps(Rat4);
	props.layer = 2;

	//( bins ) - create bin props
	bins = new props.Group()
	bins.image = 'sprites/prop_3.png';
	bins.image.offset.y = 4;
	bins.scale = 1.5;
	bins.width = 24;
    bins.height = 24;
	bins.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	bins.y = (i) => (building.height/8) * i + building.height/8;
	bins.amount = random(5, 8); 

	//( chair ) - create chair1 props
	chair = new props.Group()
	chair.image = 'sprites/prop_4.png';
	chair.image.offset.y = 4;
	chair.scale = 1.5;
	chair.width = 24;
    chair.height = 24;
	chair.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	chair.y = (i) => (building.height/8) * i + building.height/8;
	chair.amount = 8; 

	//( chair ) - create chair2 props
	chair = new props.Group()
	chair.image = 'sprites/prop_1.png';
	chair.image.offset.y = 4;
	chair.scale = 1.5;
	chair.width = 24;
    chair.height = 24;
	chair.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	chair.y = (i) => (building.height/8) * i + building.height/8;
	chair.amount = 5, 8; 

	//( printer ) - create printer props
	printer = new props.Group()
	printer.image = 'sprites/prop_5.png';
	printer.image.offset.y = 1;
	printer.scale = 1.2;
	printer.width = 30;
    printer.height = 27;
	printer.x = up.x = (i) => random((building.width + 200), (building.width - 200));
	printer.y = (i) => (building.height/8) * i + building.height/8;
	printer.amount = 8;
	printer.rotationLock = true;

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

		//Rat 1 teleport UP & DOWN
		if (Rat1.overlaps(up[6]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[5].y; Rat1.x = up[5].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else if (Rat1.overlaps(up[5]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[4].y; Rat1.x = up[4].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else if (Rat1.overlaps(up[4]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[3].y; Rat1.x = up[3].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else if (Rat1.overlaps(up[3]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[2].y; Rat1.x = up[2].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else if (Rat1.overlaps(up[2]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[1].y; Rat1.x = up[1].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else if (Rat1.overlaps(up[1]) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = up[0].y; Rat1.x = up[0].x;
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  } else {
			up.stop;
		  }
		  
		  /*if (Rat1.overlaps(down) && millis() - lastMoveTime > cooldownTime) {
			Rat1.y = Rat1.y + (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		//Rat 2 teleport UP & DOWN
		if (Rat2.overlaps(up) && millis() - lastMoveTime > cooldownTime) {
			Rat2.y = Rat2.y - (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		  
		  if (Rat2.overlaps(down) && millis() - lastMoveTime > cooldownTime) {
			Rat2.y = Rat2.y + (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		  		//Rat 3 teleport UP & DOWN
		if (Rat3.overlaps(up) && millis() - lastMoveTime > cooldownTime) {
			Rat3.y = Rat2.y - (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		  
		  if (Rat3.overlaps(down) && millis() - lastMoveTime > cooldownTime) {
			Rat3.y = Rat3.y + (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		//Rat 4 teleport UP & DOWN
		if (Rat4.overlaps(up) && millis() - lastMoveTime > cooldownTime) {
			Rat4.y = Rat4.y - (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }
		  
		  if (Rat4.overlaps(down) && millis() - lastMoveTime > cooldownTime) {
			Rat4.y = Rat4.y + (building.height/8.2);
			lastMoveTime = millis();
			cooldownTime = random(500, 2000);
		  }*/

			animation(ani, up[3].x, up[3].y);
			ani.layer = 6;
			ani.frameDelay = 60;

			if (kb.presses('f')) animation(idle, up[3].x, up[3].y);
			idle.layer = 7;
			console.log(idle);


		}

function imageSequence(prefix, numberOfFrames, ext="png") {
	let sequence = [];
	for (let i=0; i < numberOfFrames; i++) {
		sequence[i] = prefix + i + ext;
	}
	return sequence;
}

function keyPressed() {
	// toggle 
	allSprites.debug = !allSprites.debug;  
    liftopen();
  }






  