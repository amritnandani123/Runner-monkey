
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var gameState= "play";
var gameover,gameover_img;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  

 
}



function setup() {
 createCanvas(500,500)
   monkey=createSprite(80,310); 
   monkey.addAnimation("moving",monkey_running);
   monkey.scale=0.15;
   
   ground=createSprite(250,480,500,8);
  
 // creating groups for obasticle and bananas
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}


function draw() {
  background(220);
  //adding gravity
    monkey.velocityY = monkey.velocityY + 3;
  
 //make monkey collide with invisible ground
    monkey.collide(ground);
 
  if(gameState === "play") {
    if(frameCount % 10 ===0) {
      score=score+1;
    }
    Spanbanana();
    //adding obasticles
    obstacles();
    
    
   

    
    //adding jump 
    if(keyDown("space") && monkey.y === 429.95) {
             monkey.velocityY=-40;
      
           }
    if(monkey.isTouching(obstacleGroup)) {
       gameState= "end";
      
  
    }
     if(bananaGroup.isTouching(monkey)) {  
      bananaGroup.destroyEach();
    }
   
  
    
     } else if(gameState==="end") {
       
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
       bananaGroup.setLifetimeEach(-1);
        monkey.addAnimation("moving",monkey_running);
        if(keyDown("space")) {
          reset();
        }
               
               }
  
  drawSprites();
  text("Survival Time: "+score,400,50)
}

function obstacles() {
  if (frameCount % 150 === 0) {

    obstacle = createSprite(600, 450);
    obstacle.addAnimation("rock", obstaceImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX=-8;
    obstacle.lifetime = 130;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -(8 + 2*score/5);

  }
}
//function for banana
function Spanbanana() {
  if(frameCount % 80 ===0){
    banana=createSprite(600,200);
    banana.velocityX=-10;
    banana.addImage("banana",bananaImage)
    banana.scale=0.1;
    var rand;
    rand= Math.round(random(200,120))
    banana.y=rand;
    console.log(banana.y)
   
    banana.velocityX = -(10 + 2*score/5);

    banana.lifetime=70;
    bananaGroup.add(banana);
  } 
}



function reset() {
  gameState="play";
  obstacleGroup.setVelocityXEach(-8); 
  bananaGroup.setVelocityXEach(-8);
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0;
}


