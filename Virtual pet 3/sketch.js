//Create variables here
var dog, happydog, database, food, foodstock,foodobj,feeddogbutton,refillfoodstockbutton;
var doggo;
var milkbottleimg;
var milkbottle1,milkbottle2,milkbottle3,milkbottle4,milkbottle5;
var bg;
var time;
var lastFeed;
var b = 0;
var bottle =[];
function preload() {
  //load images here
  dog = loadImage("images/dog.png");
  happydog = loadImage("images/dogh.png");
  milkbottleimg = loadImage("images/Milk.png")
}

function setup() {
  
  //create a canvas
  createCanvas(700, 500);

  //create dog sprite
  doggo = createSprite(500, 300);
  doggo.addImage("doggoanimation", dog);
  doggo.addImage("happydoganimation",happydog);
  doggo.scale = 0.2;

  //create a feed button
  feeddogbutton = createButton("Feed the dog");
  feeddogbutton.position(400,300);

  //create a refill stock button
  refillfoodstockbutton = createButton("Refill food stock");
  refillfoodstockbutton.position(400,350);

  foodobj = new Food();
  database = firebase.database();
  foodobj.getFoodStock();

}

function readpos(data) {
  food = data.val();
  console.log("food = "+food)
}


function readpos2(data) {
  foodstock = data.val();  
}

function errorpos() {
  console.log("crashedddd!!!!")
}

function draw() {
  if (bg===undefined)
  {
    bg = "cyan";
  }
  //background
  background(bg);

  //text
  fill ("yellow");
  textSize (28);
  text ("Note : Click on the up arrow",10,50);
  text ("key to feed the dog!",10,75);
  text ("Note : Click on the down arrow",10,125);
  text ("key to buy more food and",10,150);
  text ("refill the food stock!",10,175);

  //display food and food stock
  text("Food stock: "+foodstock,20,450);
  text("Food given to the dog: "+food,20,400);
  drawSprites();

  feeddogbutton.mousePressed(function()
  {
    foodobj.deductFoodStock();
    lastFeedf();

    for (var i = 0; i<800; )
    bottle[b] = createSprite(i+410,100);
    bottle[b].addImage(milkbottleimg);
    bottle[b].scale = 0.1;

    if (b%300===0)
    {
      bottle[b].y = 200;
    }
    
    b=b+50;
  })
  
  foodobj.display();

  refillfoodstockbutton.mousePressed(function()
  {
    foodobj.updateFoodStock();
  }) 

  changeBgImg();
}

async function changeBgImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  database.ref("lastFeed").on("value",function (data)
  {
    lastFeed = data.val();
  })

  if(hour===lastFeed+1){
      bg = "BgImages/bg1";
  }
  
  if (hour===lastFeed+2)
  {
    bg = "BgImages/bg2";
  }

  if (hour===lastFeed+3)
  {
    "BgImages/bg3";
  }

  if (hour===lastFeed+4)
  {
    "BgImages/bg4";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}

async function lastFeedf(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour1 = datetime.slice(11,13);
  
  database.ref("/").set({
    lastFeed:hour
  })
}