var PLAY = 1
var END = 0
var gameState = PLAY;

var player1Img, player2Img

var player1, player2

var player1Score = 0, player2Score = 0

var alienSpaceshipImg

var player1Bullet, player2Bullet

var alienSpaceshipLeft, alienSpaceshipRight

var bullet1Group, alienShip1Group

var bullet2Group, alienShip2Group

var player1Lives = 1
var player2Lives = 1

function preload() {
  bg = loadImage("background.jpeg");
  player1Img = loadImage("spaceship.png");
  player2Img = loadImage("spaceship2.png");
  alienSpaceshipImg = loadImage("alienSpaceship.png");
}


function setup() {
  createCanvas(1000, 700);

  player1 = createSprite(250, 600, 200, 200);
  player1.addImage(player1Img, "Image");
  player1.scale = 0.25;

  player2 = createSprite(750, 600, 200, 200);
  player2.addImage(player2Img, "Image");
  player2.scale = 0.25

  border = createSprite(500, 350, 20, 700);
  border.shapeColor = "red"

  invisibleBorder = createSprite(500, 700, 1000, 20);
  invisibleBorder.visible = false;

  player2Bullet = createSprite(700, 350, 20, 20);
  player2Bullet.shapeColor = "blue"
  player2Bullet.visible = false

  bullet1Group = new Group();
  bullet2Group = new Group();
  alienShip1Group = new Group();
  alienShip2Group = new Group();
}

function draw() {
  background(bg);  

  fill("white");
  textSize(20);
  text("Use A and D to move and W to shoot", 100, 50);
  textSize(18);
  text("Use left and right arrow keys to move and up arrow to shoot", 520, 50);
  textSize(20);
  text("Lives: " + player1Lives, 20, 100);
  text("Lives: " + player2Lives, 900, 100);
  text("Score: " + player1Score, 20, 150);
  text("Score: " + player2Score, 900, 150);

  if(gameState === PLAY) {

  if(keyDown("LEFT") && player2.x > 500) {
    player2.x = player2.x - 6;
  }
  if(keyDown("RIGHT") && player2.x < 1000) {
    player2.x = player2.x + 6;
  }
  if(keyDown("A") && player1.x > 0) {
    player1.x = player1.x - 6;
  }
  if(keyDown("D") && player1.x < 500) {
    player1.x = player1.x + 6;
  }
  spawnAlienShips();

  if(keyDown("W")) {
    shootPlayer1Bullet();
  }
  if(keyDown("UP")) {
    shootPlayer2Bullet();
  }
  if(alienShip1Group.isTouching(bullet1Group)) {
    alienShip1Group.destroyEach();
    bullet1Group.destroyEach();
    player1Score = player1Score + 10
  }
  if(alienShip2Group.isTouching(bullet2Group)) {
    alienShip2Group.destroyEach();
    bullet2Group.destroyEach();
    player2Score = player2Score + 10
  }
  if(alienShip1Group.isTouching(player1) || alienShip1Group.isTouching(invisibleBorder)) {
    player1Lives--
    gameState = END
  }
  if(alienShip2Group.isTouching(player2) || alienShip2Group.isTouching(invisibleBorder)) {
    player2Lives--
    gameState = END
  }
}
if(gameState === END) {
  textSize(40)
  border.visible = false;
  combinedScore = (player1Score + player2Score) / 10
  if(player1Lives < 1) {
    text("GAME OVER! PLAYER 2 WINS", 250, 350);
  }
  else if(player2Lives < 1) {
    text("GAME OVER! PLAYER 1 WINS", 250, 350);
  }
  textSize(30);
  text("Player 1 and Player 2 destroyed " + combinedScore + " alien ships!", 250, 450);
}
  drawSprites();
}

function spawnAlienShips() {
  if(frameCount % 100 === 0) {
  alienSpaceshipLeft = createSprite(500, 0, 200, 100);
  alienSpaceshipLeft.addImage(alienSpaceshipImg, "Image");
  alienSpaceshipLeft.scale = 0.35
  alienSpaceshipLeft.x = Math.round(random(50, 450));
  alienSpaceshipLeft.velocityY = 7 + player1Score/100;
  alienSpaceshipLeft.lifetime = 250;
  alienSpaceshipLeft.setCollider("rectangle", 0, 0, 290, 90);

  alienShip1Group.add(alienSpaceshipLeft);


  alienSpaceshipRight = createSprite(500, 0, 200, 100);
  alienSpaceshipRight.addImage(alienSpaceshipImg, "Image");
  alienSpaceshipRight.scale = 0.35;
  alienSpaceshipRight.x = Math.round(random(550, 950));
  alienSpaceshipRight.velocityY = 7 + player2Score/100;
  alienSpaceshipRight.lifetime = 250;
  alienSpaceshipRight.setCollider("rectangle", 0, 0, 290, 90);

  alienShip2Group.add(alienSpaceshipRight);
  }
}

function shootPlayer1Bullet() {
  if(frameCount % 10 === 0) {
  player1Bullet = createSprite(200, 350, 20, 20);
  player1Bullet.shapeColor = "blue";
  player1Bullet.x = player1.x;
  player1Bullet.y = player1.y;
  player1Bullet.velocityY = -6;
  player1Bullet.lifetime = 150;

  bullet1Group.add(player1Bullet);
  }
}
function shootPlayer2Bullet() {
  if(frameCount % 10 === 0) {
  var player2Bullet = createSprite(200, 350, 20, 20);
  player2Bullet.shapeColor = "blue";
  player2Bullet.x = player2.x;
  player2Bullet.y = player2.y;
  player2Bullet.velocityY = -6;
  player2Bullet.lifetime = 150;

  bullet2Group.add(player2Bullet);
  }
}