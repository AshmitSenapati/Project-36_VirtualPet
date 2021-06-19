var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedTheDog;
var foodObj;
var fedtime
//create feed and lastFed variable here
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed The Dog");
  feedTheDog.position(680,95);
  feedTheDog.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('FeedTime')
fedTime.on('value',function(data){
  lastFed = data.val()
});
 
  //write code to display text lastFed time here
  fill("white");
  if(lastFed>12){
    text("Last Fed: "+ lastFed % 12 + " PM", 350,28)
  }
  else if(lastFed === 0){
    text("Last Fed:12 AM", 350,28)
  }
  else {
    text("Last Fed: "+ lastFed + "AM", 350,28)
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStockVal = foodObj.getFoodStock();
  if(foodStockVal<= 0){
    foodObj.updateFoodStock(foodStockVal * 0);
  }
  else {
    foodObj.updateFoodStock(foodStockVal - 1);
  }
  //foodS-= 1
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

