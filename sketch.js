var ship;
var direction=0;
var missiles;
var asteroids;
var backgroundC=255;

function setup() {
  createCanvas(640,360);
   ship = createSprite(width/2, height/2);
   ship.addImage(loadImage("images/rocket0.png"));
   missiles = new Group();
   asteroids = new Group();
   for (i=0;i<5;i++){
      asteroid = createSprite(width*random(),height*random());
      asteroid.addImage(loadImage("images/asteroid.png"));      
      asteroid.setSpeed(2,360*random());
      asteroid.addToGroup(asteroids);
   }
}

function draw() {
   background(backgroundC);
   moveShip();
   checkAsteroids();
   checkCollisions();
   
   if (asteroids.length<1){
      makeNewAsteroids();
   }
   text("hi",500,500);
   drawSprites();
}

function moveShip(){
     if (keyDown(32)){
     createNewMissle()};
     
     if(keyDown(LEFT_ARROW)){
    direction -= 4;
    ship.rotation = direction;};
  if(keyDown(RIGHT_ARROW)){
    direction += 4;
    ship.rotation = direction;
    ship.setSpeed(0,direction);};
   if(keyDown(UP_ARROW)){
      ship.setSpeed(3, direction);};
   
   if (ship.position.y<0){
      ship.position.y=height;
   }
   if (ship.position.y>height){
      ship.position.y=0;
   }
   if (ship.position.x<0){
      ship.position.x=width;
   }
   if (ship.position.x>width){
      ship.position.x=0;
   }
}

function createNewMissle(){

   var newMissile = createSprite(ship.position.x,ship.position.y,5,5);
   newMissile.shapeColor = color(255,0,0);
   newMissile.setSpeed(6,direction);
   newMissile.life=40;
   missiles.add(newMissile);
}

function checkAsteroids(){
   for (i=0;i<asteroids.length;i++){
   var ast = asteroids[i];
   if (ast.position.y<0){
      ast.position.y=height;
      text(ast.position.y,30,30);
   }
   if (ast.position.y>height){
      ast.position.y=0;
   }
   if (ast.position.x<0){
      ast.position.x=width;
   }
   if (ast.position.x>width){
      ast.position.x=0;
   }
   }
   
}

function checkCollisions(){
 asteroids.bounce(asteroids);
 if (asteroids.collide(ship)) {
    ship.position.x=width/2;
    ship.position.y=height/2;
    
 }
  missiles.overlap(asteroids, destroyAst)
 }

function destroyAst(asteroids,asteroid){
   asteroid.remove();
  
}

function makeNewAsteroids(){
  
   for (i=0;i<10;i++){
      asteroid = createSprite(width*random(),height*random());
      asteroid.addImage(loadImage("images/asteroid.png"));      
      asteroid.setSpeed(2,360*random());
      asteroid.addToGroup(asteroids);
   }
}

