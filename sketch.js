//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  Dog= loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database ()
  
  createCanvas(500, 500);
  
  dog= createSprite(250,330,10,10);
  dog.addImage(Dog);
  dog.scale=0.2;

  

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87)
  
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  //add styles here
  textSize(20);
  fill ("black");
  text ("Remaining Food: "+ foodS, 150,200);
  text("Press UP to feed the dog!", 120,50);



}

function readStock(data){
  foodS= data.val();
}
function writeStock(x){

  if (x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  
  database.ref("/").update({
    Food:x
  })
  
}


