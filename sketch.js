var catImg ;
var ratImg ;
var CcatImg ;
var CratImg ;
var bg ;
var play = false ;
var speed = 3 ;
var boost = 10 ; 
var temp = 0 ;
var left_flip = false;
var right_flip = true;
var particles = [] ; 
var bulletGroup ; 
function preload(){

  catImg = loadAnimation("cat.png");
  ratImg = loadAnimation("rat.png");
  CcatImg = loadAnimation("cat collide.png");
  CratImg = loadAnimation("rat collide.png");
  bg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(800,600);

  cat = createSprite(400, 200, 30, 30); 
  rat = createSprite(50, 100, 50, 50);
  
  bulletGroup = createGroup();
  
  cat.addAnimation("cat" , catImg);
  cat.addAnimation("collide" , CcatImg);
  rat.addAnimation("rat" , ratImg);
  rat.addAnimation("collide" , CratImg);
  
  fill(0,0,255);
  textSize(30);
  stroke(20);
}
function draw() {
  background(bg);  


  if (keyDown("space")){
    play = true ;
  }

  if (play === true) {
    if (cat.y === rat.y )
    {
      cat.velocityY = 0 ;
    }
    if (cat.x === rat.x )
    {
      cat.velocityX = 0 ;
    }
    if (cat.x > rat.x )
    {
      cat.velocityX = -1 ;
      if (left_flip === true){
        cat.mirrorX(cat.mirrorX() * -1);
        left_flip = false ; 
        right_flip = true ;
      }
    }
    if (cat.x < rat.x )
    {
      cat.velocityX = 1 ;
      if (right_flip === true){
        cat.mirrorX(cat.mirrorX() * -1);
        right_flip = false ; 
        left_flip = true ;
      }
    }
    if (cat.y < rat.y )
    {
      cat.velocityY = 1 ;
    }
    if (cat.y > rat.y )
    {
      cat.velocityY = -1 ;
    }

    if (rat.x-cat.x  <=  rat.width/2+cat.width/2 && 
        rat.y-cat.y <= rat.height/2+cat.height/2 && 
        cat.x-rat.x <= cat.width/2+rat.width/2 && 
        cat.y-rat.y <= cat.height/2+rat.height/2) 
    {
      text("You are Caught by the cat", width/5, height/2);
      cat.changeAnimation("collide" , catImg);
      rat.changeAnimation("collide" , ratImg);
      rat.rotation = 90 ; 
      rat.y = cat.y + cat.height/2 ;
      rat.x = cat.x ;
      cat.velocityX = 0 ;
      cat.velocityY = 0 ;
      
    }
    else {

      if (keyDown("left_arrow") || keyDown("a")){
        rat.x -= speed ;
      }
      if (keyDown("right_arrow") || keyDown("d")){
        rat.x += speed ;
      }
      if (keyDown("up_arrow") || keyDown("w")){
        rat.y -= speed ;
      }
      if (keyDown("down_arrow") || keyDown("s")){
        rat.y += speed ;
      }
      if (keyDown("e") || keyDown("q")){
        if (temp > 2) {temp = 0 ;}
        if (temp === 0 ){
          speed = 5 ;
        }
        temp += 0.1
      }
      if (speed > 3) {
        speed -= 0.1
      }
      if (keyDown("h")){
        hit(rat.x , rat.y)
      }
      if(bulletGroup.isTouching(cat)){
        if (right_flip){
          cat.x += 15;
          cat.y += 5 ;
        }
        if (left_flip){
          cat.x -= 15;
          cat.y -= 5 ;
        }
        bulletGroup.destroyEach();
      }
      

      cat.changeAnimation("cat" , catImg);
      rat.changeAnimation("rat" , ratImg);
    }
  }
  drawSprites();
  if (play === false){
    fill(0,0,255);
    textSize(30);
    stroke(20);
    text("Dont let the Cat Catch" , width/4, 30);
    fill(255,0,0);
    text("Use the arrow keys to move" , width/5, height/2-50);
    text("You can also Shoot with h key" , width/5, height/2-10);
    text("Press the Space key to play" , width/5, height/2+30);
    fill(255,0,255);
    text("Created by Akshit Lal" , width/4, height-20);
  }
}
function hit(x ,y) 
{
  bullet = createSprite(x , y , 5 , 5);
  bullet.shapeColor = "yellow" ;
  if (left_flip) {
    bullet.velocityX = -5 ;
  }
  else {
    bullet.velocityX = 5 ;
  }
  bullet.lifetime = 200 ; 
  bulletGroup.add(bullet) ;
}