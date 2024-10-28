let bricks, tilesGroup, props;
let cheeseToggle = 1, cheese1, cheese2, cheese3;
let BackgroundScaling = 'Min';
let BackgroundWidth = (1281); let BackgroundHeight = (541);
let MinScaleY = 0.9; let MinScaleX = 1;
let BricksScaleY; let BricksScaleX;
let clouds, cloud1, cloud2, cloud3, cloud4, cloud5, cloud6;
let lift, lyft1, lyft2, lyft3, lyft4, lyft5, lyft6, lyft7, lyft0;
let rat1, rat2, rat3, rat4, r1direct, r2direct, r3direct, r4direct;
let bee1, bee2, bee3, b1direct, b2direct, b3direct; 
let sloth1R; let sloth1L; let sloth2R; let sloth2L;
let trail1, trail2, trail3, trail4; let timer1 = 0; let timer2 = 0; let timer3 = 0; let timer4 = 0; let trailType = 1;
let pollenTimer1 = 0; let pollenTimer2 = 0; let pollenTimer3 = 0;
let lastMoveTime = 0; let cooldownTime = 50; let minCooldown = 1000; let maxCooldown = 3000;
let L7Split = 6; let L6Split = 0; let L5Split = 0; let L4Split = 0; let L3Split = 0; let L2Split = 0; let L1Split = 0;  L0Split = 1; 
let initial = 0; let idleAnim = 0; let RandomEvent = 0;
let isRotatingR = 'false'; let RotateAngleR = 0; let isRotatingL = 'false'; let RotateAngleL = 0;// Flag to track if rotation is active, SLOTH1L+R
let fluctuationTime = 0; // Initialize a variable to keep track of time

// Lift Option Split Randomiser
function LiftRandomise() {
	L6Split = [5, 7][floor(random() * 2)]; L5Split = [4, 6][floor(random() * 2)];
	L4Split = [3, 5][floor(random() * 2)]; L3Split = [2, 4][floor(random() * 2)];
	L2Split = [1, 3][floor(random() * 2)]; L1Split = [0, 2][floor(random() * 2)];
	}

	
function preload() {
	font = loadFont('PalmerLake.ttf');

	// lyft_animations preload [ 0-7 ]
	lyft0 = new Sprite(0, 0, 523, 738 ); lyft0.spriteSheet = 'assets/sequences/lyft.png'; lyft0.anis.frameDelay = 10; 
	lyft0.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, /*roll: { row: 1, frames: 5, frameDelay: 14 },*/ closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft0.changeAni('closed'); 

	lyft1 = new Sprite(0, 0, 523, 738 ); lyft1.spriteSheet = 'assets/sequences/lyft.png'; lyft1.anis.frameDelay = 10; 
	lyft1.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, /*roll: { row: 1, frames: 5, frameDelay: 14 },*/ closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft1.changeAni('closed'); 

	lyft2 = new Sprite(0, 0, 523, 738 ); lyft2.spriteSheet = 'assets/sequences/lyft.png'; lyft2.anis.frameDelay = 10; 
	lyft2.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft2.changeAni('closed'); 

	lyft3 = new Sprite(0, 0, 523, 738 ); lyft3.spriteSheet = 'assets/sequences/lyft.png'; lyft3.anis.frameDelay = 10; 
	lyft3.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft3.changeAni('closed'); 

	lyft4 = new Sprite(0, 0, 523, 738 ); lyft4.spriteSheet = 'assets/sequences/lyft.png'; lyft4.anis.frameDelay = 10; 
	lyft4.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft4.changeAni('closed'); 

	lyft5 = new Sprite(0, 0, 523, 738 ); lyft5.spriteSheet = 'assets/sequences/lyft.png'; lyft5.anis.frameDelay = 10; 
	lyft5.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft5.changeAni('closed'); 

	lyft6 = new Sprite(0, 0, 523, 738 ); lyft6.spriteSheet = 'assets/sequences/lyft.png'; lyft6.anis.frameDelay = 10; 
	lyft6.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft6.changeAni('closed'); 

	lyft7 = new Sprite(0, 0, 523, 738 ); lyft7.spriteSheet = 'assets/sequences/lyft.png'; lyft7.anis.frameDelay = 10; 
	lyft7.addAnis({
		opening: { row: 0, frames: 10 }, closing: { row: 1, frames: 10 }, closed: { row: 0, frames: 1 }, opened: { row: 1, frames: 1 }
	}); lyft7.changeAni('closed'); 

	rat1 = new Sprite(300, 300, 341, 594 ); rat1.spriteSheet = 'assets/sequences/rat_1.png'; rat1.anis.frameDelay = 10; 
	rat1.addAnis({ walk: { row: 0, frames: 10 }, stand: { row: 0, frames: 1 } }); rat1.changeAni('walk'); 

	rat2 = new Sprite(300, 300, 341, 594 ); rat2.spriteSheet = 'assets/sequences/rat_2.png'; rat2.anis.frameDelay = 10; 
	rat2.addAnis({ walk: { row: 0, frames: 10 }, stand: { row: 0, frames: 1 } }); rat2.changeAni('walk'); 

	rat3 = new Sprite(300, 300, 341, 594 ); rat3.spriteSheet = 'assets/sequences/rat_3.png'; rat3.anis.frameDelay = 10; 
	rat3.addAnis({ walk: { row: 0, frames: 10 }, stand: { row: 0, frames: 1 } }); rat3.changeAni('walk'); 

	rat4 = new Sprite(300, 300, 341, 594 ); rat4.spriteSheet = 'assets/sequences/rat_4.png'; rat4.anis.frameDelay = 10; 
	rat4.addAnis({ walk: { row: 0, frames: 10 }, stand: { row: 0, frames: 1 } }); rat4.changeAni('walk'); 

	cat = new Sprite(300, 300, 170, 220 ); cat.spriteSheet = 'assets/sequences/cat_sprite.png'; cat.anis.frameDelay = 10; 
	cat.addAnis({ idle: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 }, wave: { row: 1, frames: 10 }, transition: { row: 2, frames: 10 }, talk: { row: 3, frames: 10 } }); cat.changeAni('idle'); 

	sloth1R = new Sprite(300, 900, 446, 446 ); sloth1R.spriteSheet = 'assets/sequences/sloth_2.png'; sloth1R.anis.frameDelay = 10; 
	sloth1R.addAnis({ ClockW: { row: 0, frames: 10 }, ClockWfreeze: { row: 0, frames: 1 }, AntiClockW: { row: 1, frames: 10 }, AntiClockWfreeze: { row: 1, frames: 1 }}); sloth1R.changeAni('ClockWfreeze');
	 
    sloth1L = new Sprite(300, 900, 446, 446 ); sloth1L.spriteSheet = 'assets/sequences/sloth_2.png'; sloth1L.anis.frameDelay = 10; 
	sloth1L.addAnis({ ClockW: { row: 0, frames: 10 }, ClockWfreeze: { row: 0, frames: 1 }, AntiClockW: { row: 1, frames: 10 }, AntiClockWfreeze: { row: 1, frames: 1 }}); sloth1R.changeAni('AntiClockWfreeze');

	sloth2R = new Sprite(600, 700, 212, 190 ); sloth2R.spriteSheet = 'assets/sequences/sloth_1.png'; sloth2R.anis.frameDelay = 10; 
	sloth2R.addAnis({ idle: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 }}); sloth2R.changeAni('idle'); 

	sloth2L = new Sprite(600, 700, 212, 190 ); sloth2L.spriteSheet = 'assets/sequences/sloth_1.png'; sloth2L.anis.frameDelay = 10; 
	sloth2L.addAnis({ idle: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 }}); sloth2L.changeAni('idle'); 

	bee1 = new Sprite(300, 300, 107, 127 ); bee1.spriteSheet = 'assets/sequences/bee_1.png'; bee1.anis.frameDelay = 10; 
	bee1.addAnis({ patrol: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 } }); bee1.changeAni('patrol'); 

	bee2 = new Sprite(300, 300, 107, 127 ); bee2.spriteSheet = 'assets/sequences/bee_1.png'; bee2.anis.frameDelay = 10; 
	bee2.addAnis({ patrol: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 } }); bee2.changeAni('patrol'); 

	bee3 = new Sprite(300, 300, 107, 127 ); bee3.spriteSheet = 'assets/sequences/bee_1.png'; bee3.anis.frameDelay = 10; 
	bee3.addAnis({ patrol: { row: 0, frames: 10 }, freeze: { row: 0, frames: 1 } }); bee3.changeAni('patrol'); 
}

function setup() {
new Canvas(windowWidth, windowHeight, 'fullscreen');
/*displayMode('centered', 'pixelated', 8);*/
/*new Canvas(1080, 1080, 'fullscreen');*/

	frameRate(60); 
	textFont(font);
    textAlign(CENTER, TOP);
	p5play.renderStats = true;
    allSprites.pixelPerfect = true;

	// Gradient Background,
	gradient = new Sprite();
    gradient.x = windowWidth/2; gradient.y = windowHeight/2;
    gradient.collider = 'none'; gradient.layer = 0;
    gradient.image = 'assets/gradient_bg.png'; gradient.sleeping = true;

	// Gradient Image is ( 1811 x 815 )
	GradScaleX = (windowWidth/1811)*1; GradScaleY = (windowHeight/815)*1;
	gradient.image.scale.x = GradScaleX; gradient.image.scale.y = GradScaleY;

    // Clouds Generation
	cloud1 = new Sprite(); cloud1.amount = 1; cloud1.scale = windowHeight/1800; cloud1.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud1.layer = 1;
	cloud1.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud1.speed = random(0, 0.3) + 0.1; cloud1.collider = 'none';
	cloud1.image = '../assets/cloud_1.png'; cloud1.width = windowWidth/8; cloud1.height = windowHeight/8; cloud1.opacity = 0.8;

	cloud2 = new Sprite(); cloud2.amount = 1; cloud2.scale = windowHeight/1800; cloud2.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud2.layer = 1;
	cloud2.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud2.speed = random(0, 0.3) + 0.1; cloud2.collider = 'none';
	cloud2.image = '../assets/cloud_10.png'; cloud2.width = windowWidth/8; cloud2.height = windowHeight/8; cloud2.opacity = 0.8;

	cloud3 = new Sprite(); cloud3.amount = 1; cloud3.scale = windowHeight/1800; cloud3.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud3.layer = 1;
	cloud3.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud3.speed = random(0, 0.3) + 0.1; cloud3.collider = 'none';
	cloud3.image = '../assets/cloud_11.png'; cloud3.width = windowWidth/8; cloud3.height = windowHeight/8; cloud3.opacity = 0.8;

	cloud4 = new Sprite(); cloud4.amount = 1; cloud4.scale = windowHeight/1800; cloud4.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud4.layer = 1;
	cloud4.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud4.speed = random(0, 0.3) + 0.1; cloud4.collider = 'none';
	cloud4.image = '../assets/cloud_' + floor(random(2, 9))+ '.png'; cloud4.width = windowWidth/8; cloud4.height = windowHeight/8; cloud4.opacity = 0.8;

	cloud5 = new Sprite(); cloud5.amount = 1; cloud5.scale = windowHeight/1800; cloud5.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud5.layer = 1;
	cloud5.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud5.speed = random(0, 0.3) + 0.1; cloud5.collider = 'none';
	cloud5.image = '../assets/cloud_' + floor(random(2, 9))+ '.png'; cloud5.width = windowWidth/8; cloud5.height = windowHeight/8; cloud5.opacity = 0.8;

	cloud6 = new Sprite(); cloud6.amount = 1; cloud6.scale = windowHeight/1800; cloud6.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud6.layer = 1;
	cloud6.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud6.speed = random(0, 0.3) + 0.1; cloud6.collider = 'none';
	cloud6.image = '../assets/cloud_' + floor(random(2, 9))+ '.png'; cloud6.width = windowWidth/8; cloud6.height = windowHeight/8; cloud6.opacity = 0.8;

	cloud7 = new Sprite(); cloud7.amount = 1; cloud7.scale = windowHeight/1800; cloud7.x = (random(windowWidth-windowWidth-(windowWidth/32), windowWidth/2)); cloud7.layer = 1;
	cloud7.y = (random(windowHeight/8, windowHeight/2) + windowHeight/60); cloud7.speed = random(0, 0.3) + 0.1; cloud7.collider = 'none';
	cloud7.image = '../assets/cloud_' + floor(random(2, 9))+ '.png'; cloud7.width = windowWidth/8; cloud7.height = windowHeight/8; cloud7.opacity = 0.8;
	
    // Building Generation
    bricks = new Group();
	bricks.w = width/2;
	bricks.h = height/9;
	bricks.tile = '=';
    
    bricks.textColor = 'white';
    bricks.textSize = height/10;
    bricks.collider = 'static';

    tilesGroup = new Tiles(
		[
			'=',
			'=',
			'=',
			'=',
			'=',
			'=',
			'=',
			'='
		],
		width/2, height/9+(height/30)-(height/60), bricks.w + 4, bricks.h + 4, 20, 20
	);  tilesGroup.shape = "chain";
	    tilesGroup.text = (i) => i;

        // Building Outline Generation
        outlineGroup = new Tiles(
		[
			'=',
			'=',
			'=',
			'=',
			'=',
			'=',
			'=',
			'='
		],
		width/2, height/9+(height/30)-(height/60), bricks.w + 4, bricks.h + 4, 20, 20
	);  outlineGroup.shape = "chain";
	    outlineGroup.stroke = '#270f6b';
		outlineGroup.strokeWeight = 5;

	    // Playarea Hitbox
	    playarea = new Sprite(); playarea.x = tilesGroup[4].x; playarea.y = tilesGroup[4].y - tilesGroup[4].height/2;
	    playarea.width = width/2-width/150; playarea.height = height/9*9;
	    playarea.collider = 'static'; playarea.opacity = 0; playarea.shape = 'chain';

		//Ground Generation
		ground = new Sprite();
		ground.h = tilesGroup[7].height; ground.w = windowWidth; 
		ground.x = width/2
		ground.y = tilesGroup[7].y + tilesGroup[7].height;
		ground.amount = 1; ground.collider = 'static';
		ground.color = '#270f6b'; ground.strokeWeight = 0;
 

	// Lift Generation
	lift = new Group();
	lift.h = tilesGroup[1].height/2.5; lift.w = lift.h * 0.7; 
    lift.x = (i) => i + width/2 + random(width/8, -(width/8));
	lift.y = (i) => i * height/9 + height/5.2-(height/60);
	lift.amount = 8; lift.opacity = 0.0; lift.scale = 1;
    lift.mass = 10000; lift.rotationLock = true;
	/*lift.text = (i) => i; lift.textSize = 100;*/
	

	// Midground Buildings 
	// Left-side Tower 1
	tower1 = new Sprite(); 
	tower1.y = tilesGroup[7].y - tilesGroup[7].y/4; tower1.x = windowWidth/18;
	tower1.collider = 'none'; tower1.layer = 1;  
	tower1.image = '../assets/building_' + floor(random(1, 6)) + '.png'; 

	// Right-side Tower 2
	tower2 = new Sprite(); 
	tower2.y = tilesGroup[7].y - tilesGroup[7].y/4; tower2.x = windowWidth - windowWidth/18;
	tower2.collider = 'none'; tower2.layer = 1;  
	tower2.image = '../assets/building_' + floor(random(1, 6)) + '.png'; 

	// Add more towers if longer width
	if (windowWidth > 1300){
    // Right-side Tower 2
	tower3 = new Sprite(); 
	tower3.y = tilesGroup[7].y - tilesGroup[7].y/4; tower3.x = windowWidth - windowWidth/5;
	tower3.collider = 'none'; tower3.layer = 1;  
	tower3.image = '../assets/building_' + floor(random(1, 6)) + '.png'; 

	tower4 = new Sprite(); 
	tower4.y = tilesGroup[7].y - tilesGroup[7].y/4; tower4.x = windowWidth/5;
	tower4.collider = 'none'; tower4.layer = 1;  
	tower4.image = '../assets/building_' + floor(random(1, 6)) + '.png'; 
	} else if (windowWidth > 2000){

	}

	// Midground Background (2560 x 436)
	midground = new Sprite();
	midground.x = windowWidth/2; midground.y = tilesGroup[7].y;
	midground.width = windowWidth;
	midground.collider = 'none'; midground.layer = 1;
	midground.image = 'assets/bg_midground.png'; midground.sleeping = true;
	midgroundScaling = (windowWidth/2560); midground.image.scale = midgroundScaling*1.3;
    
	// Checkered Background Light (2589 x 753)
	bgChecker = new Sprite();
	bgChecker.x = windowWidth/2; bgChecker.y = tilesGroup[6].y;
	bgChecker.width = windowWidth;
	bgChecker.collider = 'none'; bgChecker.layer = 0;
	bgChecker.image = 'assets/bg_checkered.png'; bgChecker.sleeping = true;
    bgChecker.image.scale = midgroundScaling*1.3; bgChecker.opacity = 0.2;

	// Checkered Background Dark (2589 x 753)
	bgCheckerDark = new Sprite();
	bgCheckerDark.x = windowWidth/2; bgCheckerDark.y = tilesGroup[0].y - windowHeight/5;
	bgCheckerDark.width = windowWidth;
	bgCheckerDark.collider = 'none'; bgCheckerDark.layer = 0;
	bgCheckerDark.image = 'assets/bg_checkered_dark.png'; bgCheckerDark.sleeping = true;
    bgCheckerDark.image.scale = midgroundScaling*1.3; bgCheckerDark.opacity = 0.15;

	// Background Background "Buildings" (2560 x 436)
	bgBackground = new Sprite();
	bgBackground.x = windowWidth/2; bgBackground.y = tilesGroup[7].y;
	bgBackground.width = windowWidth;
	bgBackground.collider = 'none'; bgBackground.layer = 0;
	bgBackground.image = 'assets/bg_background.png'; bgBackground.sleeping = true;
    bgBackground.image.scale = midgroundScaling*1.3;
	
	

// Wallpaper Min Scaling
// What is the dimensions of the background? Enter them here: ( 1101x303 )
// Responsive Background Textures Gen.
let BricksScaleY = (bricks[0].y/BackgroundHeight) * MinScaleY; let BricksScaleX = (bricks[0].x/BackgroundWidth) * MinScaleX;

tilesGroup[0].image = 'assets/L0_' + BackgroundScaling + '.png'; tilesGroup[0].image.scale.y = BricksScaleY; tilesGroup[0].image.scale.x = BricksScaleX;
tilesGroup[1].image = 'assets/L1_' + BackgroundScaling + '.png'; tilesGroup[1].image.scale.y = BricksScaleY; tilesGroup[1].image.scale.x = BricksScaleX;
tilesGroup[2].image = 'assets/L2_' + BackgroundScaling + '.png'; tilesGroup[2].image.scale.y = BricksScaleY; tilesGroup[2].image.scale.x = BricksScaleX;
tilesGroup[3].image = 'assets/L3_' + BackgroundScaling + '.png'; tilesGroup[3].image.scale.y = BricksScaleY; tilesGroup[3].image.scale.x = BricksScaleX;
tilesGroup[4].image = 'assets/L4_' + BackgroundScaling + '.png'; tilesGroup[4].image.scale.y = BricksScaleY; tilesGroup[4].image.scale.x = BricksScaleX;
tilesGroup[5].image = 'assets/L5_' + BackgroundScaling + '.png'; tilesGroup[5].image.scale.y = BricksScaleY; tilesGroup[5].image.scale.x = BricksScaleX;
tilesGroup[6].image = 'assets/L6_' + BackgroundScaling + '.png'; tilesGroup[6].image.scale.y = BricksScaleY; tilesGroup[6].image.scale.x = BricksScaleX;
tilesGroup[7].image = 'assets/L7_' + BackgroundScaling + '.png'; tilesGroup[7].image.scale.y = BricksScaleY; tilesGroup[7].image.scale.x = BricksScaleX;

tilesGroup[0].layer = 2; tilesGroup[1].layer = 2; tilesGroup[2].layer = 2; tilesGroup[3].layer = 2; tilesGroup[4].layer = 2; tilesGroup[5].layer = 2; tilesGroup[6].layer = 2; tilesGroup[7].layer = 2;

//Spawn Cheese on Click ( Image Sizes: 32x32)
cheeseScale = lift.w/53/2;
cheese1 = new Group(); cheese1.collider = "dynamic"; cheese1.friction = 0; cheese1.mass = 0; cheese1.image = 'assets/cheese_1.png'; cheese1.rotationLock = true; cheese1.image.scale = cheeseScale; cheese1.life = 1000; cheese1.bounciness = 0.5;
cheese2 = new Group(); cheese2.collider = "dynamic"; cheese2.friction = 0; cheese2.mass = 0; cheese2.image = 'assets/cheese_2.png'; cheese2.rotationLock = true; cheese2.image.scale = cheeseScale; cheese2.life = 1000; cheese2.bounciness = 0.5;
cheese3 = new Group(); cheese3.collider = "dynamic"; cheese3.friction = 0; cheese3.mass = 0; cheese3.image = 'assets/cheese_3.png'; cheese3.rotationLock = true; cheese3.image.scale = cheeseScale; cheese3.life = 1000; cheese3.bounciness = 0.5;

// !!! Prop Spawning Array !!!
props = new Group(); props.layer = 5;
propsXScaling = (windowWidth/1000); propsYScaling = (windowHeight/1000); 

// Level 7
// Potted Plant x1-3 ( lv1Plant )
lv1Plant = new props.Group(); lv1Plant.image = 'assets/lv1_props_3.png';
lv1Plant.scale = 0.3; lv1Plant.image.scale = windowHeight/1000;
lv1Plant.width = (propsYScaling)*69; lv1Plant.height = (propsYScaling)*129; lv1Plant.amount = floor(random(1, 3)); lv1Plant.rotationLock = true;
lv1Plant.x = (i) => random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2));
lv1Plant.y = (i) => random((tilesGroup[7].y + tilesGroup[7].height/4), (tilesGroup[7].y));

// Hairball x1-2 ( lv1Ball )
lv1Ball = new props.Group(); lv1Ball.image = 'assets/lv1_props_1.png'; 
lv1Ball.scale = 0.3; lv1Ball.image.scale = windowHeight/1000; lv1Ball.mass = 0; lv1Ball.bounciness = 0.8; lv1Ball.friction = 0.15; lv1Ball.rotationLock = false;
/*lv1Ball.width = (propsYScaling)*62; lv1Ball.height = (propsYScaling)*62;*/ lv1Ball.diameter = (propsYScaling)*62; lv1Ball.amount = floor(random(1, 3)); 
lv1Ball.x = (i) => random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2));
lv1Ball.y = (i) => random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));

// Water Cooler x1-2 ( lv1Cool )
lv1Cool = new props.Group(); lv1Cool.image = 'assets/lv1_props_2.png'; 
lv1Cool.scale = 0.3; lv1Cool.image.scale = windowHeight/1000; 
lv1Cool.width = (propsYScaling)*69; lv1Cool.height = (propsYScaling)*129; lv1Cool.amount = floor(random(1, 2)); 
lv1Cool.x = (i) => random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2));
lv1Cool.y = (i) => random((tilesGroup[7].y + tilesGroup[7].height/4), (tilesGroup[7].y));

// Sofa x1 ( lv1Sofa ), Random
lv1Sofa = new props.Group(); lv1Sofa.image = 'assets/lv1_props_4.png'; 
lv1Sofa.scale = 0.3; lv1Sofa.image.scale = windowHeight/1000; 
lv1Sofa.width = (propsYScaling)*140; lv1Sofa.height = (propsYScaling)*71; lv1Sofa.amount = floor(random(1, 1)); 
lv1Sofa.x = (i) => random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2));
lv1Sofa.y = (i) => random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));

// Web x1 ( lv1web ), Right Corner Mounted
lv1Web = new props.Group(); lv1Web.image = 'assets/right_web.png'; 
lv1Web.scale = 0.3; lv1Web.image.scale = windowHeight/1000; 
lv1Web.width = (propsYScaling)*140; lv1Web.height = (propsYScaling)*71; lv1Web.amount = floor(random(1, 1)); 
lv1Web.x = (tilesGroup[7].x + tilesGroup[7].width/2 - lv1Web.width/8); lv1Web.collider = "none";
lv1Web.y = tilesGroup[7].y - tilesGroup[7].height/2.5;

// Spider x2 ( lv1spider ), Random Top Mounted
lv1Spider = new props.Group(); lv1Spider.image = 'assets/spider.png'; 
lv1Spider.scale = 0.3; lv1Spider.image.scale = windowHeight/1000; 
lv1Spider.width = (propsYScaling)*140; lv1Spider.height = (propsYScaling)*71; lv1Spider.amount = floor(random(1, 2)); 
lv1Spider.x = random(tilesGroup[7].x + tilesGroup[7].width/2.15, tilesGroup[7].x - tilesGroup[7].width/2.1); lv1Spider.collider = "none";
lv1Spider.y = tilesGroup[7].y - tilesGroup[7].height/2.5; 

// Poster 1 ( STAY CALM ) x1 ( lv1Post ), Random Middle Mounted
lv1Post = new props.Group(); lv1Post.image = 'assets/poster_1.png'; 
lv1Post.scale = 0.3; lv1Post.image.scale = windowHeight/1000; 
lv1Post.width = (propsYScaling)*140; lv1Post.height = (propsYScaling)*71; lv1Post.amount = floor(random(1, 3)); 
lv1Post.x = (i) => random(tilesGroup[7].x + tilesGroup[7].width/2.1, tilesGroup[7].x - tilesGroup[7].width/2.1); lv1Post.collider = "none";
lv1Post.y = (i) => random(tilesGroup[7].y, tilesGroup[7].y + tilesGroup[7].height/4); lv1Post.layer = 4;

// Poster 2 ( LIVE LAUGH WORK ) x1 ( lv1Post2 ), Random Middle Mounted
lv1Post = new props.Group(); lv1Post.image = 'assets/poster_2.png'; 
lv1Post.scale = 0.3; lv1Post.image.scale = windowHeight/1000; 
lv1Post.width = (propsYScaling)*140; lv1Post.height = (propsYScaling)*71; lv1Post.amount = floor(random(1, 1)); 
lv1Post.x = (i) => random(tilesGroup[7].x + tilesGroup[7].width/2.1, tilesGroup[7].x - tilesGroup[7].width/2.1); lv1Post.collider = "none";
lv1Post.y = (i) => random(tilesGroup[7].y, tilesGroup[7].y + tilesGroup[7].height/4); lv1Post.layer = 4;

// Vent ( lv1Vent ), Random Middle Mounted
lv1Vent = new props.Group(); lv1Vent.image = 'assets/vent.png'; 
lv1Vent.scale = 0.2; lv1Vent.image.scale = windowHeight/1000; 
lv1Vent.width = (propsYScaling)*74; lv1Vent.height = (propsYScaling)*59; lv1Vent.amount = floor(random(1, 1)); 
lv1Vent.x = (i) => random(tilesGroup[7].x + tilesGroup[7].width/2.1, tilesGroup[7].x - tilesGroup[7].width/2.1); lv1Vent.collider = "none";
lv1Vent.y = (i) => random(tilesGroup[7].y - tilesGroup[7].height/2.5, tilesGroup[7].y - tilesGroup[7].height/3); lv1Vent.layer = 4;

// LEVEL 6
// Potted Bamboo x3-4 ( lv2Plant )
lv2Plant = new props.Group(); lv2Plant.image = 'assets/lv2_props_1.png';
lv2Plant.scale = 0.3; lv2Plant.image.scale = windowHeight/1000;
lv2Plant.width = (propsYScaling)*80; lv2Plant.height = (propsYScaling)*163; lv2Plant.amount = floor(random(3, 4)); lv2Plant.rotationLock = true;
lv2Plant.x = (i) => random((tilesGroup[6].x + tilesGroup[6].width/2), (tilesGroup[6].x - tilesGroup[6].width/2));
lv2Plant.y = (i) => random((tilesGroup[6].y + tilesGroup[6].height/4), (tilesGroup[6].y));

// Lamp x1-2 ( lv2Lamp )
lv2Lamp = new props.Group(); lv2Lamp.image = 'assets/lv2_prop_2.png';
lv2Lamp.scale = 0.3; lv2Lamp.image.scale = windowHeight/1000;
lv2Lamp.width = (propsYScaling)*60; lv2Lamp.height = (propsYScaling)*78; lv2Lamp.amount = floor(random(1, 3)); lv2Lamp.rotationLock = true;
lv2Lamp.x = (i) => random((tilesGroup[6].x + tilesGroup[6].width/2), (tilesGroup[6].x - tilesGroup[6].width/2));
lv2Lamp.y = (i) => random((tilesGroup[6].y + tilesGroup[6].height/4), (tilesGroup[6].y));

// Vent ( lv2Vent ), Random Middle Mounted
lv2Vent = new props.Group(); lv2Vent.image = 'assets/vent.png'; 
lv2Vent.scale = 0.2; lv2Vent.image.scale = windowHeight/1000; 
lv2Vent.width = (propsYScaling)*74; lv2Vent.height = (propsYScaling)*59; lv2Vent.amount = floor(random(1, 1)); 
lv2Vent.x = (i) => random(tilesGroup[6].x + tilesGroup[6].width/2.1, tilesGroup[6].x - tilesGroup[6].width/2.1); lv2Vent.collider = "none";
lv2Vent.y = (i) => random(tilesGroup[6].y - tilesGroup[6].height/2.5, tilesGroup[6].y - tilesGroup[6].height/3); lv2Vent.layer = 3;

// vine small x1-8 ( lv2vineS ), Random Top Mounted
lv2vineS = new props.Group(); lv2vineS.image = 'assets/vine_s.png'; 
lv2vineS.scale = 0.3; lv2vineS.image.scale = windowHeight/1000; 
lv2vineS.width = (propsYScaling)*140; lv2vineS.height = (propsYScaling)*71; lv2vineS.amount = floor(random(1, 8)); 
lv2vineS.x = (i) => random(tilesGroup[6].x + tilesGroup[6].width/2.15, tilesGroup[6].x - tilesGroup[6].width/2.1); lv2vineS.collider = "none";
lv2vineS.y = (i) => tilesGroup[6].y - tilesGroup[6].height/2.1; lv2vineS.rotation = (i) => random(0, 360); lv2vineS.layer = 3;

// vine medium x2-4 ( lv2vineM ), Random Top Mounted
lv2vineM = new props.Group(); lv2vineM.image = 'assets/vine_m.png'; 
lv2vineM.scale = 0.3; lv2vineM.image.scale = windowHeight/1000; 
lv2vineM.width = (propsYScaling)*140; lv2vineM.height = (propsYScaling)*71; lv2vineM.amount = floor(random(1, 4)); 
lv2vineM.x = (i) => random(tilesGroup[6].x + tilesGroup[6].width/2.15, tilesGroup[6].x - tilesGroup[6].width/2.1); lv2vineM.collider = "none";
lv2vineM.y = (i) => tilesGroup[6].y - tilesGroup[6].height/2.1; lv2vineM.rotation = (i) => random(0, 360); lv2vineM.layer = 3;

// vine large x1-2 ( lv2vineL ), Random Top Mounted
lv2vineL = new props.Group(); lv2vineL.image = 'assets/vine_m.png'; 
lv2vineL.scale = 0.3; lv2vineL.image.scale = windowHeight/1000; 
lv2vineL.width = (propsYScaling)*140; lv2vineL.height = (propsYScaling)*71; lv2vineL.amount = floor(random(1, 2)); 
lv2vineL.x = (i) => random(tilesGroup[6].x + tilesGroup[6].width/2.15, tilesGroup[6].x - tilesGroup[6].width/2.1); lv2vineL.collider = "none";
lv2vineL.y = (i) => tilesGroup[6].y - tilesGroup[6].height/2.1; lv2vineL.rotation = (i) => random(0, 360); lv2vineL.layer = 3;

// LEVEL 5
// Potted Daisy x3-4 ( lv3Plant )
lv3Plant = new props.Group(); lv3Plant.image = 'assets/daisy.png';
lv3Plant.scale = 0.3; lv3Plant.image.scale = windowHeight/1000;
lv3Plant.width = (propsYScaling)*50; lv3Plant.height = (propsYScaling)*93; lv3Plant.amount = floor(random(3, 5)); lv3Plant.rotationLock = true;
lv3Plant.x = (i) => random((tilesGroup[5].x + tilesGroup[5].width/2), (tilesGroup[5].x - tilesGroup[5].width/2));
lv3Plant.y = (i) => random((tilesGroup[5].y - tilesGroup[5].height/3), (tilesGroup[5].y - tilesGroup[5].height/2));

// Box S x1-3 ( lv3boxS ), Random
lv3boxS = new props.Group(); lv3boxS.image = 'assets/box_s.png'; 
lv3boxS.scale = 0.3; lv3boxS.image.scale = windowHeight/1000; 
lv3boxS.width = (propsYScaling)*82; lv3boxS.height = (propsYScaling)*53; lv3boxS.amount = floor(random(1, 3)); 
lv3boxS.x = (i) => random((tilesGroup[5].x + tilesGroup[5].width/2), (tilesGroup[5].x - tilesGroup[5].width/2));
lv3boxS.y = (i) => random((tilesGroup[5].y - tilesGroup[5].height/4), (tilesGroup[5].y));

// Box M x1-2 ( lv3boxS ), Random
lv3boxM = new props.Group(); lv3boxM.image = 'assets/box_m.png'; 
lv3boxM.scale = 0.3; lv3boxM.image.scale = windowHeight/1000; 
lv3boxM.width = (propsYScaling)*102; lv3boxM.height = (propsYScaling)*64; lv3boxM.amount = floor(random(1, 2)); 
lv3boxM.x = (i) => random((tilesGroup[5].x + tilesGroup[5].width/2), (tilesGroup[5].x - tilesGroup[5].width/2));
lv3boxM.y = (i) => random((tilesGroup[5].y - tilesGroup[5].height/4), (tilesGroup[5].y));

// Box L x2 ( lv3boxL ), Random
lv3boxL = new props.Group(); lv3boxL.image = 'assets/box_l.png'; 
lv3boxL.scale = 0.3; lv3boxL.image.scale = windowHeight/1000; 
lv3boxL.width = (propsYScaling)*136; lv3boxL.height = (propsYScaling)*86; lv3boxL.amount = floor(random(1, 1)); 
lv3boxL.x = (i) => random((tilesGroup[5].x + tilesGroup[5].width/2), (tilesGroup[5].x - tilesGroup[5].width/2));
lv3boxL.y = (i) => (tilesGroup[5].y + tilesGroup[5].height/3);

// Honeycomb x3 (lv3comb), Random Middle Mounted
lv3comb = new props.Group(); lv3comb.image = 'assets/hcomb.png'; 
lv3comb.scale = 0.2; lv3comb.image.scale = windowHeight/1000; 
lv3comb.width = (propsYScaling)*83; lv3comb.height = (propsYScaling)*67; lv3comb.amount = floor(random(4, 7)); 
lv3comb.x = (i) => random(tilesGroup[5].x + tilesGroup[5].width/2.4, tilesGroup[5].x - tilesGroup[5].width/2.4); lv3comb.collider = "none";
lv3comb.y = (i) => random(tilesGroup[5].y + tilesGroup[5].height/2.2, tilesGroup[5].y - tilesGroup[5].height/3); lv3comb.layer = 4; lv3comb.rotation = (i) => floor(random(0,6)) * 60;

// hive x2-3 ( lv3hive ), Random Top Mounted
lv3hive = new props.Group(); lv3hive.image = 'assets/hive.png'; 
lv3hive.scale = 0.3; lv3hive.image.scale = windowHeight/1000; 
lv3hive.width = (propsYScaling)*61; lv3hive.height = (propsYScaling)*75; lv3hive.amount = floor(random(2, 3)); 
lv3hive.x = (i) => random(tilesGroup[5].x + tilesGroup[5].width/2.15, tilesGroup[5].x - tilesGroup[6].width/2.1); lv3hive.collider = "none";
lv3hive.y = tilesGroup[5].y - tilesGroup[5].height/2.5; lv3hive.layer = 4;

// Prop Overlap Declarations:
lift.overlaps(lv1Ball);lift.overlap(lv1Plant);lift.overlap(lv1Cool);lift.overlap(lv1Sofa); lv1Plant.overlaps(lv1Sofa); 
lv1Ball.overlaps(lv1Plant); lv1Ball.overlaps(lv1Cool); lv1Ball.overlaps(lv1Sofa); lv1Cool.overlaps(lv1Plant); lv1Cool.overlaps(lv1Sofa); 

lift.overlaps(lv3Plant); lift.overlaps(lv3boxL);  lift.overlaps(lv3boxM);  lift.overlaps(lv3boxS); 

cheese1.overlaps(lift); cheese1.overlaps(lv1Ball); cheese1.overlap(lv1Plant); cheese1.overlap(lv1Cool); cheese1.overlap(lv1Sofa); cheese1.overlap(lv2Plant); cheese1.overlap(lv2Lamp);
cheese2.overlaps(lift); cheese2.overlaps(lv1Ball); cheese2.overlap(lv1Plant); cheese2.overlap(lv1Cool); cheese2.overlap(lv1Sofa); cheese2.overlap(lv2Plant); cheese2.overlap(lv2Lamp);
cheese3.overlaps(lift); cheese3.overlaps(lv1Ball); cheese3.overlap(lv1Plant); cheese3.overlap(lv1Cool); cheese3.overlap(lv1Sofa); cheese3.overlap(lv2Plant); cheese3.overlap(lv2Lamp);

// Rats Overlap Declarations:
rat1.overlaps(rat2);rat1.overlaps(rat3);rat1.overlaps(rat4);rat2.overlaps(rat3);rat2.overlaps(rat4);rat3.overlaps(rat4);
rat1.overlaps(lift); rat1.overlaps(lv1Cool); rat1.overlaps(lv1Plant); rat1.overlaps(lv1Sofa); rat1.overlaps(lv2Plant); rat1.overlaps(lv2Lamp); rat1.overlaps(lv3Plant); rat1.overlaps(lv3boxS); rat1.overlaps(lv3boxM); rat1.overlaps(lv3boxL);
rat2.overlaps(lift); rat2.overlaps(lv1Cool); rat2.overlaps(lv1Plant); rat2.overlaps(lv1Sofa); rat2.overlaps(lv2Plant); rat2.overlaps(lv2Lamp); rat2.overlaps(lv3Plant); rat2.overlaps(lv3boxS); rat2.overlaps(lv3boxM); rat2.overlaps(lv3boxL);
rat3.overlaps(lift); rat3.overlaps(lv1Cool); rat3.overlaps(lv1Plant); rat3.overlaps(lv1Sofa); rat3.overlaps(lv2Plant); rat3.overlaps(lv2Lamp); rat3.overlaps(lv3Plant); rat3.overlaps(lv3boxS); rat3.overlaps(lv3boxM); rat3.overlaps(lv3boxL);
rat4.overlaps(lift); rat4.overlaps(lv1Cool); rat4.overlaps(lv1Plant); rat4.overlaps(lv1Sofa); rat4.overlaps(lv2Plant); rat4.overlaps(lv2Lamp); rat4.overlaps(lv3Plant); rat4.overlaps(lv3boxS); rat4.overlaps(lv3boxM); rat4.overlaps(lv3boxL);

// NPC Scaling Algorithm
npcScale = lift[1].h/100 

// WE ARE THE RATS 
// Rats Setup, post Preloading
rat1.collider = 'dynamic'; rat1.scale = npcScale/2 * 0.30; rat1.debug = true; r1direct = 'left'; rat1.mass = 200; rat1.rotationLock = false; 
rat2.collider = 'dynamic'; rat2.scale = npcScale/2 * 0.30; rat2.debug = true; r2direct = 'right'; rat2.mass = 200; rat2.rotationLock = false; rat2.mirror.x = true
rat3.collider = 'dynamic'; rat3.scale = npcScale/2 * 0.30; rat3.debug = true; r3direct = 'left'; rat3.mass = 200; rat3.rotationLock = false;
rat4.collider = 'dynamic'; rat4.scale = npcScale/2 * 0.30; rat4.debug = true; r4direct = 'right'; rat4.mass = 200; rat4.rotationLock = false; rat4.mirror.x = true

// Teleport Rats to L7, based on random seeding
rat1.x = random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2)); rat1.y = random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));
rat2.x = random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2)); rat2.y = random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));
rat3.x = random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2)); rat3.y = random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));
rat4.x = random((tilesGroup[7].x + tilesGroup[7].width/2), (tilesGroup[7].x - tilesGroup[7].width/2)); rat4.y = random((tilesGroup[7].y + tilesGroup[7].height/2), (tilesGroup[7].y));

// Rat Smoke Trail
trail1 = new Group();
trail1.d = 10; trail1.collider = 'none'; trail1.direction = 'up'; trail1.speed = 0.05; trail1.life = 50; trail1.rotation = () => random(0, 360);
trail1.amount = 1; trail1.x = rat1.x; trail1.y = rat1.y; trail1.image = '../assets/smoke_' + trailType+ '.png'; trail1.scale = 0.25; trail1.opacity = 0.5;
trail2 = new Group();
trail2.d = 10; trail2.collider = 'none'; trail2.direction = 'up'; trail2.speed = 0.05; trail2.life = 50; trail2.rotation = () => random(0, 360);
trail2.amount = 1; trail2.x = rat2.x; trail2.y = rat2.y; trail2.image = '../assets/smoke_' + trailType+ '.png'; trail2.scale = 0.25; trail2.opacity = 0.5;
trail3 = new Group();
trail3.d = 10; trail3.collider = 'none'; trail3.direction = 'up'; trail3.speed = 0.05; trail3.life = 50; trail3.rotation = () => random(0, 360);
trail3.amount = 1; trail3.x = rat3.x; trail3.y = rat3.y; trail3.image = '../assets/smoke_' + trailType+ '.png'; trail3.scale = 0.25; trail3.opacity = 0.5;
trail4 = new Group();
trail4.d = 10; trail4.collider = 'none'; trail4.direction = 'up'; trail4.speed = 0.05; trail4.life = 50; trail4.rotation = () => random(0, 360);
trail4.amount = 1; trail4.x = rat4.x; trail4.y = rat4.y; trail4.image = '../assets/smoke_' + trailType+ '.png'; trail4.scale = 0.25; trail4.opacity = 0.5;

// Bee Pollen Trail
pollen1 = new Group; pollen2 = new Group; pollen3 = new Group;
pollen1.d = 10; pollen1.collider = 'none'; pollen1.direction = 'down'; pollen1.speed = (i) => random(0.05, 0.02); pollen1.life = 50; pollen1.rotation = () => random(0, 360);
pollen1.amount = (i) => floor(random(2,4)); pollen1.x = bee1.x; pollen1.y = bee1.y; pollen1.scale = 0.25; pollen1.opacity = 0.6; pollen1.color = 'white'; pollen1.strokeWeight = 0;
pollen2.d = 10; pollen2.collider = 'none'; pollen2.direction = 'down'; pollen2.speed = (i) => random(0.05, 0.02); pollen2.life = 50; pollen2.rotation = () => random(0, 360);
pollen2.amount = (i) => floor(random(2,4)); pollen2.x = bee2.x; pollen2.y = bee2.y; pollen2.scale = 0.25; pollen2.opacity = 0.6; pollen2.color = 'white'; pollen2.strokeWeight = 0;
pollen3.d = 10; pollen3.collider = 'none'; pollen3.direction = 'down'; pollen3.speed = (i) => random(0.05, 0.02); pollen3.life = 50; pollen3.rotation = () => random(0, 360);
pollen3.amount = (i) => floor(random(2,4)); pollen3.x = bee3.x; pollen3.y = bee3.y; pollen3.scale = 0.25; pollen3.opacity = 0.6; pollen3.color = 'white'; pollen3.strokeWeight = 0;

// NPCs Static Characteristics
// Level 1, Cat  
cat.layer = 8; cat.scale = npcScale * 0.7; cat.collider = "none";
// Level 2, Sloths
tilesGroup[5].layer = 4; tilesGroup[6].layer = 2; tilesGroup[7].layer = 4; /* Provide depth to hide sloths */
sloth1R.layer = 3; sloth1R.collider = "none"; sloth1R.scale = npcScale * 0.9; sloth1R.ani.frameDelay = 20;
sloth1L.layer = 3; sloth1L.collider = "none"; sloth1L.scale = npcScale * 0.9; sloth1L.ani.frameDelay = 20;
// Sloth 1 Hitbox PT1, Setup
vineHB_R = new Sprite(20, 20, 8, tilesGroup[6].h*0.5); vineHB_R.gravity = 0; vineHB_R.collider = 'kinematic'; vineHB_R.debug = true; vineHB_R.offset.y = 60; vineHB_R.opacity = 0;
vineHB_L = new Sprite(20, 20, 8, tilesGroup[6].h*0.5); vineHB_L.gravity = 0; vineHB_L.collider = 'kinematic'; vineHB_L.debug = true; vineHB_L.offset.y = 60; vineHB_L.opacity = 0;

// vineHB L & R overlap declerations, don't hit anything above!! 
vineHB_R.overlaps(tilesGroup); vineHB_R.overlaps(outlineGroup); vineHB_R.overlaps(playarea);vineHB_R.overlaps(lift);
vineHB_L.overlaps(tilesGroup); vineHB_L.overlaps(outlineGroup); vineHB_L.overlaps(playarea);vineHB_L.overlaps(lift); 
vineHB_R.overlaps(lv3Plant); vineHB_R.overlaps(lv3boxL); vineHB_R.overlaps(lv3boxM); vineHB_R.overlaps(lv3boxS); vineHB_R.overlaps(cheese1); vineHB_R.overlaps(cheese2); vineHB_R.overlaps(cheese3); vineHB_R.overlaps(lv2Lamp); vineHB_R.overlaps(lv2Plant); 
vineHB_L.overlaps(lv3Plant); vineHB_L.overlaps(lv3boxL); vineHB_L.overlaps(lv3boxM); vineHB_L.overlaps(lv3boxS); vineHB_L.overlaps(cheese1); vineHB_L.overlaps(cheese2); vineHB_L.overlaps(cheese3); vineHB_L.overlaps(lv2Lamp); vineHB_L.overlaps(lv2Plant); 

//Sloth 2 Initialisation  
sloth2R.layer = 6; sloth2R.collider = "none"; sloth2R.scale = npcScale * 0.7;
sloth2L.layer = 6; sloth2L.collider = "none"; sloth2L.scale = npcScale * 0.7; sloth2L.mirror.x = true;

//Level 3, Bee 1
bee1.layer = 8; bee1.scale = npcScale * 0.7; bee1.collider = "dynamic"; b1direct = 'right'; bee1.mirror.x = true; bee1.rotationLock = true;
bee1.overlaps(lv3Plant); bee1.overlaps(lv3boxL); bee1.overlaps(lv3boxM); bee1.overlaps(lv3boxS); bee1.overlaps(lift); bee1.overlaps(vineHB_L); bee1.overlaps(vineHB_R);


bee2.layer = 8; bee2.scale = npcScale * 0.7; bee2.collider = "dynamic"; b2direct = 'right'; bee2.mirror.x = true; bee2.rotationLock = true;
bee2.overlaps(lv3Plant); bee2.overlaps(lv3boxL); bee2.overlaps(lv3boxM); bee2.overlaps(lv3boxS); bee2.overlaps(lift); bee2.overlaps(vineHB_L); bee2.overlaps(vineHB_R);


bee3.layer = 8; bee3.scale = npcScale * 0.7; bee3.collider = "dynamic"; b3direct = 'right'; bee3.mirror.x = true; bee3.rotationLock = true;
bee3.overlaps(lv3Plant); bee3.overlaps(lv3boxL); bee3.overlaps(lv3boxM); bee3.overlaps(lv3boxS); bee3.overlaps(lift); bee3.overlaps(vineHB_L); bee3.overlaps(vineHB_R);

bee1.overlaps(bee2); bee1.overlaps(bee3); bee2.overlaps(bee3);
}

function draw() {
	clear();

// Initialise World Variables
background('#ede7fd');
world.gravity.y = 11;

if (initial == 0) {
//Preloading, on active memory 
// NPCs Dynamic Characteristics ( Location, Snap to Ground )
// Level 1, Cat  
cat.x = random(tilesGroup[7].x + tilesGroup[7].width/2.1, tilesGroup[7].x - tilesGroup[7].width/2.1);  cat.y = ((tilesGroup[7].y + tilesGroup[7].height/2)-cat.h/2);
sloth2R.x = random(tilesGroup[6].x + tilesGroup[6].width/5, tilesGroup[6].x + tilesGroup[6].width/2.4);  sloth2R.y = ((tilesGroup[6].y + tilesGroup[6].height/2)-sloth2R.h/2);
sloth2L.x = random(tilesGroup[6].x - tilesGroup[6].width/5, tilesGroup[6].x - tilesGroup[6].width/2.4);  sloth2L.y = ((tilesGroup[6].y + tilesGroup[6].height/2)-sloth2L.h/2);
sloth1R.x = random(tilesGroup[6].x + tilesGroup[6].width/10, tilesGroup[6].x + tilesGroup[6].width/2.7); sloth1R.y = tilesGroup[6].y - tilesGroup[6].height/2.2;
sloth1L.x = random(tilesGroup[6].x - tilesGroup[6].width/10, tilesGroup[6].x - tilesGroup[6].width/2.7); sloth1L.y = tilesGroup[6].y - tilesGroup[6].height/2.2;
vineHB_R.x = sloth1R.x; vineHB_R.y = sloth1R.y; vineHB_R.rotation = -180;
vineHB_L.x = sloth1L.x; vineHB_R.y = sloth1L.y; vineHB_L.rotation = -180; vineHB_L.mirror = true;
bee1.x = random(tilesGroup[5].x - tilesGroup[5].width/10, tilesGroup[5].x - tilesGroup[5].width/2.7); bee1.y = tilesGroup[5].y;
bee2.x = random(tilesGroup[5].x - tilesGroup[5].width/10, tilesGroup[5].x - tilesGroup[5].width/2.7); bee2.y = tilesGroup[5].y;
bee3.x = random(tilesGroup[5].x - tilesGroup[5].width/10, tilesGroup[5].x - tilesGroup[5].width/2.7); bee3.y = tilesGroup[5].y;
initial = 1; /* SNAP BACK TO REALITY, OOP THERE GOES GRAVITY*/
}

// NPC Behaviour

// Rat Self-Straighten
if (rat1.rotation >= 1) { rat1.rotateTo(0,0.5);} else if (rat1.rotation <= -1) {rat1.rotateTo(0,0.5); } else if (rat1.rotation == 0) {}
if (rat2.rotation >= 1) { rat2.rotateTo(0,0.5);} else if (rat2.rotation <= -1) {rat2.rotateTo(0,0.5); } else if (rat2.rotation == 0) {}
if (rat3.rotation >= 1) { rat3.rotateTo(0,0.5);} else if (rat3.rotation <= -1) {rat3.rotateTo(0,0.5); } else if (rat3.rotation == 0) {}
if (rat4.rotation >= 1) { rat4.rotateTo(0,0.5);} else if (rat4.rotation <= -1) {rat4.rotateTo(0,0.5); } else if (rat4.rotation == 0) {}


// Sloth 1 Hitbox PT2, Draw
if (rat1.overlaps(tilesGroup[6])) { rat1.collides(vineHB_R); } else if (rat1.overlaps(tilesGroup[5])) { rat1.overlaps(vineHB_R); } 
if (rat2.overlaps(tilesGroup[6])) { rat2.collides(vineHB_R); } else if (rat2.overlaps(tilesGroup[5])) { rat2.overlaps(vineHB_R); } 
if (rat3.overlaps(tilesGroup[6])) { rat3.collides(vineHB_R); } else if (rat3.overlaps(tilesGroup[5])) { rat3.overlaps(vineHB_R); } 
if (rat4.overlaps(tilesGroup[6])) { rat4.collides(vineHB_R); } else if (rat4.overlaps(tilesGroup[5])) { rat4.overlaps(vineHB_R); } 
if (rat1.overlaps(tilesGroup[6])) { rat1.collides(vineHB_L); } else if (rat1.overlaps(tilesGroup[5])) { rat1.overlaps(vineHB_L); } 
if (rat2.overlaps(tilesGroup[6])) { rat2.collides(vineHB_L); } else if (rat2.overlaps(tilesGroup[5])) { rat2.overlaps(vineHB_L); } 
if (rat3.overlaps(tilesGroup[6])) { rat3.collides(vineHB_L); } else if (rat3.overlaps(tilesGroup[5])) { rat3.overlaps(vineHB_L); } 
if (rat4.overlaps(tilesGroup[6])) { rat4.collides(vineHB_L); } else if (rat4.overlaps(tilesGroup[5])) { rat4.overlaps(vineHB_L); } 

vineHB_R.x = sloth1R.x; vineHB_R.y = sloth1R.y; vineHB_L.x = sloth1L.x; vineHB_L.y = sloth1L.y // Lock Vine Slider in place

// Sloth R Rotation Mechanism
if (kb.presses('t') && isRotatingR == 'false') {
	ClockWstart(); vineHB_R.rotation = -180;
	vineHB_R.rotateTo(180, 3); isRotatingR = 'true'; // Start rotation
 } if (isRotatingR == 'true') {
    if (vineHB_R.rotation == -180 ) {
		vineHB_R.rotateTo(179, 3); isRotatingR = 'false'; vineHB_R.speed = 0; 
	} else if (vineHB_R.rotation == -179){
			vineHB_R.rotation = -180; isRotatingR = 'false'; // Stop the rotation
		}}

// Sloth L Rotation Mechanism
if (kb.presses('y') && isRotatingL == 'false') {
	AntiClockWstart();
	vineHB_L.rotation = -180;
	vineHB_L.rotateMinTo(90, 3); isRotatingL = 'true';}
	if (isRotatingL == 'true') {
		if (vineHB_L.rotation == -177 ) {
			vineHB_L.rotateMinTo(180, 3); isRotatingL = 'false'; vineHB_L.speed = 0; 
		}}
	
		
// Bee1 Animation 
if (b1direct === 'left') { bee1.direction = 0; bee1.speed = 0.9; } else if (b1direct === 'right') { bee1.direction = 180; bee1.speed = 1; }
if (bee1.overlaps(playarea)) { if (b1direct === 'right') { bee1.mirror.x = false; bee1.x -= 8;
} else if (b1direct === 'left') { bee1.mirror.x = true; bee1.x += 12; } b1direct = b1direct === 'right' ? 'left' : 'right'; }

fluctuationTime += 0.12; // Adjust the speed of fluctuation by changing this value
bee1.vel.y = 0.3 * Math.sin(fluctuationTime); // Fluctuates between 50 and -50
bee1.applyForceScaled(0, -11); if (bee1.y >= tilesGroup[5].y+5) { bee1.y--; } else if (bee1.y <= tilesGroup[5].y-5) { bee1.y++ } else {}

// Bee2 Animation 
if (b2direct === 'left') { bee2.direction = 0; bee2.speed = 0.9; } else if (b2direct === 'right') { bee2.direction = 180; bee2.speed = 1; }
if (bee2.overlaps(playarea)) { if (b2direct === 'right') { bee2.mirror.x = false; bee2.x -= 10;
} else if (b2direct === 'left') { bee2.mirror.x = true; bee2.x += 10; } b2direct = b2direct === 'right' ? 'left' : 'right'; }

fluctuationTime += 0.14; // Adjust the speed of fluctuation by changing this value
bee2.vel.y = 0.3 * Math.sin(fluctuationTime); // Fluctuates between 50 and -50
bee2.applyForceScaled(0, -11); if (bee2.y >= tilesGroup[5].y+5) { bee2.y--; } else if (bee2.y <= tilesGroup[5].y-5) { bee2.y++ } else {}

// Bee1 Animation 
if (b3direct === 'left') { bee3.direction = 0; bee3.speed = 0.9; } else if (b3direct === 'right') { bee3.direction = 180; bee3.speed = 1; }
if (bee3.overlaps(playarea)) { if (b3direct === 'right') { bee3.mirror.x = false; bee3.x -= 12;
} else if (b3direct === 'left') { bee3.mirror.x = true; bee3.x += 8; } b3direct = b3direct === 'right' ? 'left' : 'right'; }

fluctuationTime += 0.1; // Adjust the speed of fluctuation by changing this value
bee3.vel.y = 0.3 * Math.sin(fluctuationTime); // Fluctuates between 50 and -50
bee3.applyForceScaled(0, -11); if (bee3.y >= tilesGroup[5].y+5) { bee3.y--; } else if (bee3.y <= tilesGroup[5].y-5) { bee3.y++ } else {}

// Overlap Opacities 
if (lv1Post.overlaps(lift)) { lv1Post.opacity = 0; }

// Link Lifts and Lyfts, Activation Mapping
//lyft to lift ratio: ( 523 x 738 ) / ( lift.w / lift.h )
lyftScaleX = lift.w/523; lyftScaleY = lift.h/738;
lyft0.layer = 5; lyft1.layer = 5; lyft2.layer = 5; lyft3.layer = 5; lyft4.layer = 5; lyft5.layer = 5; lyft6.layer = 5; lyft7.layer = 5;

// Teleport and Scale, for Lyfts [ 0-7 ]
lyft0.x = lift[0].x; lyft0.y = lift[0].y; lyft0.scale = 4; lyft0.collider = 'none'; lyft0.scale.x = lyftScaleX; lyft0.scale.y = lyftScaleY; 
lyft1.x = lift[1].x; lyft1.y = lift[1].y; lyft1.scale = 4; lyft1.collider = 'none'; lyft1.scale.x = lyftScaleX; lyft1.scale.y = lyftScaleY; 
lyft2.x = lift[2].x; lyft2.y = lift[2].y; lyft2.scale = 4; lyft2.collider = 'none'; lyft2.scale.x = lyftScaleX; lyft2.scale.y = lyftScaleY; 
lyft3.x = lift[3].x; lyft3.y = lift[3].y; lyft3.scale = 4; lyft3.collider = 'none'; lyft3.scale.x = lyftScaleX; lyft3.scale.y = lyftScaleY; 
lyft4.x = lift[4].x; lyft4.y = lift[4].y; lyft4.scale = 4; lyft4.collider = 'none'; lyft4.scale.x = lyftScaleX; lyft4.scale.y = lyftScaleY; 
lyft5.x = lift[5].x; lyft5.y = lift[5].y; lyft5.scale = 4; lyft5.collider = 'none'; lyft5.scale.x = lyftScaleX; lyft5.scale.y = lyftScaleY; 
lyft6.x = lift[6].x; lyft6.y = lift[6].y; lyft6.scale = 4 ; lyft6.collider = 'none'; lyft6.scale.x = lyftScaleX; lyft6.scale.y = lyftScaleY; 
lyft7.x = lift[7].x; lyft7.y = lift[7].y; lyft7.scale = 4; lyft7.collider = 'none'; lyft7.scale.x = lyftScaleX; lyft7.scale.y = lyftScaleY; 

if (kb.presses('r')) lyft1.changeAni('opening');
if (kb.presses('t')) lyft1.changeAni('closing');
if (kb.presses('y')) lyft1.changeAni('opened');
if (kb.presses('u')) lyft1.changeAni('closed');

// Wallpaper Mid-Max Scaling
// What is the dimensions of the background?
// Min (1281x541), Mid (2561x541), Max(3841x541)
if (tilesGroup[1].width >= 350 && tilesGroup[1].width <= 700 && BackgroundScaling == 'Min'){
	BackgroundScaling = 'Mid';
	BackgroundWidth = (2561); BackgroundHeight = (541);
	/*MinScaleY = 1; MinScaleX = 1;*/
	BricksScaleY = (bricks[0].y/BackgroundHeight) * MinScaleY; let BricksScaleX = (bricks[0].x/BackgroundWidth) * MinScaleX;
	tilesGroup[0].image = 'assets/L0_' + BackgroundScaling + '.png'; tilesGroup[0].image.scale.y = BricksScaleY; tilesGroup[0].image.scale.x = BricksScaleX;
	tilesGroup[1].image = 'assets/L1_' + BackgroundScaling + '.png'; tilesGroup[1].image.scale.y = BricksScaleY; tilesGroup[1].image.scale.x = BricksScaleX;
	tilesGroup[2].image = 'assets/L2_' + BackgroundScaling + '.png'; tilesGroup[2].image.scale.y = BricksScaleY; tilesGroup[2].image.scale.x = BricksScaleX;
	tilesGroup[3].image = 'assets/L3_' + BackgroundScaling + '.png'; tilesGroup[3].image.scale.y = BricksScaleY; tilesGroup[3].image.scale.x = BricksScaleX;
	tilesGroup[4].image = 'assets/L4_' + BackgroundScaling + '.png'; tilesGroup[4].image.scale.y = BricksScaleY; tilesGroup[4].image.scale.x = BricksScaleX;
	tilesGroup[5].image = 'assets/L5_' + BackgroundScaling + '.png'; tilesGroup[5].image.scale.y = BricksScaleY; tilesGroup[5].image.scale.x = BricksScaleX;
	tilesGroup[6].image = 'assets/L6_' + BackgroundScaling + '.png'; tilesGroup[6].image.scale.y = BricksScaleY; tilesGroup[6].image.scale.x = BricksScaleX;
	tilesGroup[7].image = 'assets/L7_' + BackgroundScaling + '.png'; tilesGroup[7].image.scale.y = BricksScaleY; tilesGroup[7].image.scale.x = BricksScaleX;
} else if (tilesGroup[1].width >= 701 && BackgroundScaling == 'Min'){
	BackgroundScaling = 'Max';
	BackgroundWidth = (3841); BackgroundHeight = (541);
	/*MinScaleY = 1; MinScaleX = 1;*/
	BricksScaleY = (bricks[0].y/BackgroundHeight) * MinScaleY; let BricksScaleX = (bricks[0].x/BackgroundWidth) * MinScaleX;
	tilesGroup[0].image = 'assets/L0_' + BackgroundScaling + '.png'; tilesGroup[0].image.scale.y = BricksScaleY; tilesGroup[0].image.scale.x = BricksScaleX;
	tilesGroup[1].image = 'assets/L1_' + BackgroundScaling + '.png'; tilesGroup[1].image.scale.y = BricksScaleY; tilesGroup[1].image.scale.x = BricksScaleX;
	tilesGroup[2].image = 'assets/L2_' + BackgroundScaling + '.png'; tilesGroup[2].image.scale.y = BricksScaleY; tilesGroup[2].image.scale.x = BricksScaleX;
	tilesGroup[3].image = 'assets/L3_' + BackgroundScaling + '.png'; tilesGroup[3].image.scale.y = BricksScaleY; tilesGroup[3].image.scale.x = BricksScaleX;
	tilesGroup[4].image = 'assets/L4_' + BackgroundScaling + '.png'; tilesGroup[4].image.scale.y = BricksScaleY; tilesGroup[4].image.scale.x = BricksScaleX;
	tilesGroup[5].image = 'assets/L5_' + BackgroundScaling + '.png'; tilesGroup[5].image.scale.y = BricksScaleY; tilesGroup[5].image.scale.x = BricksScaleX;
	tilesGroup[6].image = 'assets/L6_' + BackgroundScaling + '.png'; tilesGroup[6].image.scale.y = BricksScaleY; tilesGroup[6].image.scale.x = BricksScaleX;
	tilesGroup[7].image = 'assets/L7_' + BackgroundScaling + '.png'; tilesGroup[7].image.scale.y = BricksScaleY; tilesGroup[7].image.scale.x = BricksScaleX;
}

//Clouds Spawn
if (cloud1.x >= windowWidth + cloud1.width/2) { cloud1.x = -cloud1.width; }
if (cloud2.x >= windowWidth + cloud2.width/2) { cloud2.x = -cloud2.width; }
if (cloud3.x >= windowWidth + cloud3.width/2) { cloud3.x = -cloud3.width; }
if (cloud4.x >= windowWidth + cloud4.width/2) { cloud4.x = -cloud4.width; }
if (cloud5.x >= windowWidth + cloud5.width/2) { cloud5.x = -cloud5.width; }
if (cloud6.x >= windowWidth + cloud6.width/2) { cloud6.x = -cloud6.width; }
if (cloud7.x >= windowWidth + cloud7.width/2) { cloud7.x = -cloud7.width; }

// Checkered Light + Dark BG Loop
if (bgChecker.x >= windowWidth/2+windowWidth/21){
bgChecker.x = windowWidth/2;
} else {
	bgChecker.x++
}

if (bgCheckerDark.x >= windowWidth/2+windowWidth/21){
	bgCheckerDark.x = windowWidth/2;
} else {
	bgCheckerDark.x++
}

if (mouse.presses() && cheeseToggle == 1){ cheeseToggle = 2; SpawnCheese1();
} else if (mouse.presses() && cheeseToggle == 2){ cheeseToggle = 3; SpawnCheese2();
} else if (mouse.presses() && cheeseToggle == 3){ cheeseToggle = 1; SpawnCheese3(); }

// Rat 1-4 Details
// Smoke Trails for Rat 1-4
timer1++; if (timer1 >= 60) { new trail1.Sprite(rat1.x, rat1.y+rat1.height/2.3); trailType = random(1,3); timer1 = 0; }
timer2++; if (timer2 >= 60) { new trail2.Sprite(rat2.x, rat2.y+rat2.height/2.3); trailType = random(1,3); timer2 = 0; }
timer3++; if (timer3 >= 60) { new trail3.Sprite(rat3.x, rat3.y+rat3.height/2.3); trailType = random(1,3); timer3 = 0; }
timer4++; if (timer4 >= 60) { new trail4.Sprite(rat4.x, rat4.y+rat4.height/2.3); trailType = random(1,3); timer4 = 0; }

// Bee Pollen 
pollenTimer1++; if (pollenTimer1 >= 30) { new pollen1.Sprite(bee1.x, bee1.y+bee1.height/2.3); pollenTimer1 = 0; }
pollenTimer2++; if (pollenTimer2 >= 30) { new pollen2.Sprite(bee2.x, bee2.y+bee2.height/2.3); pollenTimer2 = 0; }
pollenTimer3++; if (pollenTimer3 >= 30) { new pollen3.Sprite(bee3.x, bee3.y+bee3.height/2.3); pollenTimer3 = 0; }

// Animation Declerations
/* RAT 1 */ rat1.ani.frameDelay = 10; 
if (r1direct === 'right') { rat1.direction = 0; rat1.speed = 0.9; } else if (r1direct === 'left') { rat1.direction = 180; rat1.speed = 1; }
/* Check for collision with the building */ if (rat1.collides(playarea)) {
/* Move the block away from the building to prevent sticking */ if (r1direct === 'right') { rat1.mirror.x = false; rat1.x -= 10;
} else if (r1direct === 'left') { rat1.mirror.x = true; rat1.x += 10; } /* Reverse the block direction */ r1direct = r1direct === 'right' ? 'left' : 'right'; }

/* RAT 2 */ rat2.ani.frameDelay = 10; 
if (r2direct === 'right') { rat2.direction = 0; rat2.speed = 1; } else if (r2direct === 'left') { rat2.direction = 180; rat2.speed = 0.9; }
/* Check for collision with the building */ if (rat2.collides(playarea)) {
/* Move the block away from the building to prevent sticking */ if (r2direct === 'right') { rat2.mirror.x = false; rat2.x -= 9.8;
} else if (r2direct === 'left') { rat2.mirror.x = true; rat2.x += 9.8; } /* Reverse the block direction */ r2direct = r2direct === 'right' ? 'left' : 'right'; }

/* RAT 3 */ rat3.ani.frameDelay = 10; 
if (r3direct === 'right') { rat3.direction = 0; rat3.speed = 0.9; } else if (r3direct === 'left') { rat3.direction = 180; rat3.speed = 0.9; }
/* Check for collision with the building */ if (rat3.collides(playarea)) {
/* Move the block away from the building to prevent sticking */ if (r3direct === 'right') { rat3.mirror.x = false; rat3.x -= 10.2;
} else if (r3direct === 'left') { rat3.mirror.x = true; rat3.x += 10.2; } /* Reverse the block direction */ r3direct = r3direct === 'right' ? 'left' : 'right'; }

/* RAT 4 */ rat4.ani.frameDelay = 10; 
if (r4direct === 'right') { rat4.direction = 0; rat4.speed = 0.95; } else if (r4direct === 'left') { rat4.direction = 180; rat4.speed = 0.95; }
/* Check for collision with the building */ if (rat4.collides(playarea)) {
/* Move the block away from the building to prevent sticking */ if (r4direct === 'right') { rat4.mirror.x = false; rat4.x -= 10;
} else if (r4direct === 'left') { rat4.mirror.x = true; rat4.x += 9.6; } /* Reverse the block direction */ r4direct = r4direct === 'right' ? 'left' : 'right'; }


// Lift Mechanics
// RAT 1 Lift Interactions
if (rat1.overlaps(lift[7]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L7Split].y; rat1.x = lift[L7Split].x; LiftOpen_7(); LiftRandomise(); 
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[6]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L6Split].y; rat1.x = lift[L6Split].x; LiftOpen_6(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[5]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L5Split].y; rat1.x = lift[L5Split].x; LiftOpen_5(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[4]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L4Split].y; rat1.x = lift[L4Split].x; LiftOpen_4(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[3]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L3Split].y; rat1.x = lift[L3Split].x; LiftOpen_3(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[2]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L2Split].y; rat1.x = lift[L2Split].x; LiftOpen_2(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[1]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L1Split].y; rat1.x = lift[L2Split].x; LiftOpen_1(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat1.overlaps(lift[0]) && millis() - lastMoveTime > cooldownTime) {
	rat1.y = lift[L0Split].y; rat1.x = lift[L0Split].x; LiftOpen_0(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown); }

// RAT 2 Lift Interactions
if (rat2.overlaps(lift[7]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L7Split].y; rat2.x = lift[L7Split].x; LiftOpen_7(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[6]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L6Split].y; rat2.x = lift[L6Split].x; LiftOpen_6(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[5]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L5Split].y; rat2.x = lift[L5Split].x; LiftOpen_5(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[4]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L4Split].y; rat2.x = lift[L4Split].x; LiftOpen_4(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[3]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L3Split].y; rat2.x = lift[L3Split].x; LiftOpen_3(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[2]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L2Split].y; rat2.x = lift[L2Split].x; LiftOpen_2(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[1]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L1Split].y; rat2.x = lift[L2Split].x; LiftOpen_1(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat2.overlaps(lift[0]) && millis() - lastMoveTime > cooldownTime) {
	rat2.y = lift[L0Split].y; rat2.x = lift[L0Split].x; LiftOpen_0(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown); }

// RAT 3 Lift Interactions
if (rat3.overlaps(lift[7]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L7Split].y; rat3.x = lift[L7Split].x; LiftOpen_7(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[6]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L6Split].y; rat3.x = lift[L6Split].x; LiftOpen_6(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[5]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L5Split].y; rat3.x = lift[L5Split].x; LiftOpen_5(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[4]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L4Split].y; rat3.x = lift[L4Split].x; LiftOpen_4(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[3]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L3Split].y; rat3.x = lift[L3Split].x; LiftOpen_3(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[2]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L2Split].y; rat3.x = lift[L2Split].x; LiftOpen_2(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[1]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L1Split].y; rat3.x = lift[L2Split].x; LiftOpen_1(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat3.overlaps(lift[0]) && millis() - lastMoveTime > cooldownTime) {
	rat3.y = lift[L0Split].y; rat3.x = lift[L0Split].x; LiftOpen_0(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown); }

// RAT 4 Lift Interactions
if (rat4.overlaps(lift[7]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L7Split].y; rat4.x = lift[L7Split].x; LiftOpen_7(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[6]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L6Split].y; rat4.x = lift[L6Split].x; LiftOpen_6(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[5]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L5Split].y; rat4.x = lift[L5Split].x; LiftOpen_5(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[4]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L4Split].y; rat4.x = lift[L4Split].x; LiftOpen_4(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[3]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L3Split].y; rat4.x = lift[L3Split].x; LiftOpen_3(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[2]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L2Split].y; rat4.x = lift[L2Split].x; LiftOpen_2(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[1]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L1Split].y; rat4.x = lift[L2Split].x; LiftOpen_1(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown);
  } else if (rat4.overlaps(lift[0]) && millis() - lastMoveTime > cooldownTime) {
	rat4.y = lift[L0Split].y; rat4.x = lift[L0Split].x; LiftOpen_0(); LiftRandomise();
	lastMoveTime = millis(); cooldownTime = random(minCooldown, maxCooldown); }

// Rat Escape Contingency 
// Check if Rat touches the edges of the window, if so, teleport back into building.
if (rat1.x < 0 || rat1.x > windowWidth || rat1.y < 0 || rat1.y > windowHeight) { rat1.x = lift[7].x; rat1.y = lift[7].y; }
if (rat2.x < 0 || rat2.x > windowWidth || rat2.y < 0 || rat2.y > windowHeight) { rat2.x = lift[7].x; rat2.y = lift[7].y; }
if (rat3.x < 0 || rat3.x > windowWidth || rat3.y < 0 || rat3.y > windowHeight) { rat3.x = lift[7].x; rat3.y = lift[7].y; }
if (rat4.x < 0 || rat4.x > windowWidth || rat4.y < 0 || rat4.y > windowHeight) { rat4.x = lift[7].x; rat4.y = lift[7].y; }
  }

// Cheese Spawning Functions
function SpawnCheese1() { new cheese1.Sprite(mouse.x, mouse.y, lift.w/2, lift.w/2);} function SpawnCheese2() { new cheese2.Sprite(mouse.x, mouse.y, lift.w/2, lift.w/2);} function SpawnCheese3() { new cheese3.Sprite(mouse.x, mouse.y, lift.w/2, lift.w/2);}

// Debug Toggle Function
function keyPressed() {
	allSprites.debug = !allSprites.debug;  
  }

// Async Lift Open and Close Functions
async function LiftOpen_7() { lyft7.changeAni('opening'); 
	if (L7Split == 6) {
		await lyft6.changeAni('opening'); lyft7.changeAni('closing'); await lyft6.changeAni('closing'); lyft7.changeAni('closed'); await lyft6.changeAni('closed');
	} }

async function LiftOpen_6() { lyft6.changeAni('opening'); 
		if (L6Split == 5) {
			await lyft5.changeAni('opening'); lyft6.changeAni('closing'); await lyft5.changeAni('closing'); lyft6.changeAni('closed'); await lyft5.changeAni('closed');
		} else if (L6Split == 7) {
			await lyft7.changeAni('opening'); lyft6.changeAni('closing'); await lyft7.changeAni('closing'); lyft6.changeAni('closed'); await lyft7.changeAni('closed');
		} }

async function LiftOpen_5() { lyft5.changeAni('opening'); 
		if (L5Split == 4) {
			await lyft4.changeAni('opening'); lyft5.changeAni('closing'); await lyft4.changeAni('closing'); lyft5.changeAni('closed'); await lyft4.changeAni('closed');
		} else if (L5Split == 6) {
			await lyft6.changeAni('opening'); lyft5.changeAni('closing'); await lyft6.changeAni('closing'); lyft5.changeAni('closed'); await lyft6.changeAni('closed');
		} }

async function LiftOpen_4() { lyft4.changeAni('opening'); 
		if (L4Split == 3) {
			await lyft3.changeAni('opening'); lyft4.changeAni('closing'); await lyft3.changeAni('closing'); lyft4.changeAni('closed'); await lyft3.changeAni('closed');
		} else if (L4Split == 5) {
			await lyft5.changeAni('opening'); lyft4.changeAni('closing'); await lyft5.changeAni('closing'); lyft4.changeAni('closed'); await lyft5.changeAni('closed');
		} }

async function LiftOpen_3() { lyft3.changeAni('opening'); 
		if (L3Split == 2) {
			await lyft2.changeAni('opening'); lyft3.changeAni('closing'); await lyft2.changeAni('closing'); lyft3.changeAni('closed'); await lyft2.changeAni('closed');
		} else if (L3Split == 4) {
			await lyft4.changeAni('opening'); lyft3.changeAni('closing'); await lyft4.changeAni('closing'); lyft3.changeAni('closed'); await lyft4.changeAni('closed');
		} }

async function LiftOpen_2() { lyft2.changeAni('opening'); 
		if (L2Split == 1) {
			await lyft1.changeAni('opening'); lyft2.changeAni('closing'); await lyft1.changeAni('closing'); lyft2.changeAni('closed'); await lyft1.changeAni('closed');
		} else if (L2Split == 3) {
			await lyft3.changeAni('opening'); lyft2.changeAni('closing'); await lyft3.changeAni('closing'); lyft2.changeAni('closed'); await lyft3.changeAni('closed');
		} }

async function LiftOpen_1() { lyft1.changeAni('opening'); 
		if (L1Split == 0) {
			await lyft0.changeAni('opening'); lyft1.changeAni('closing'); await lyft0.changeAni('closing'); lyft1.changeAni('closed'); await lyft0.changeAni('closed');
		} else if (L1Split == 2) {
			await lyft2.changeAni('opening'); lyft1.changeAni('closing'); await lyft2.changeAni('closing'); lyft1.changeAni('closed'); await lyft2.changeAni('closed');
		} }

async function LiftOpen_0() { lyft0.changeAni('opening'); 
	if (L0Split == 1) {
		await lyft1.changeAni('opening'); lyft0.changeAni('closing'); await lyft1.changeAni('closing'); lyft0.changeAni('closed'); await lyft1.changeAni('closed');
	} }

async function ClockWstart() { await sloth1R.changeAni('ClockW'); await sloth1R.changeAni('ClockWfreeze'); }

async function AntiClockWstart() { await sloth1L.changeAni('AntiClockW'); await sloth1L.changeAni('AntiClockWfreeze'); }
