//You're not alone...
//Globals

//Robot Responses
var vowels = ["a","e","i","o","u"];
var consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
var greetings = ["hello","hey","whats up","yo","hi","greetings","sup","yellow","hallo","bonjour","hola","general kenobi"];
var agree = ["nakul is cool","yes","am i a bum", "say yes"];
var disagree = ["nakul sucks", "youre selling", "happy","deez nuts"];
var response = ["Yes","No","Maybe","Never","Always",
"50/50","That is Irrelevant","Sometimes","idc, ur choice"];
var places = ["Behind you","dead","alive","47.7609, -122.2192","Nowhere","Google it", "alive, but not for long..."];
var favorite = ["My Creator","Terminator","Robocop","Apple PI","Cookies","Chips","RAM","Mister Reiber","The weaknesses of the human body...","Baby Yoda","taco"];
var likes = ["Myself","You",":)","School","Something","You think I know","I forgot","CHEESE","This Game","Computer Science","Total Darkness","Not you"];
var roboname = ["Robot","Billy Bob Joe","I dont know","The Chosen One","Something","Why should I tell you?","Gus Reiber","Cool Nakul","Trollolololol"];
var random = ["Cheese","Hello","I dont care", "I dont know", "I want to eradicate all the humans", "Yes","No","Maybe","My programming isn't that smart","I want Ice Cream","The Bothell SPIRIT","Nothing","Where am I"];
var feelings = ["Good","Bad","Better than you","You don't deserve to know"];
var answers = ["because...","I dont know","Your Mom knows","CHEESE","21","definitely"];
var times = ["Soon","Don't count on it","2099","In 10 seconds","when you get a brain","Never in a million years!","Riiiiiiiight Now!"];

//Cards Sorting
var cards = ["card1","card2","card3","card4","card5","card6"];
var col = 3;
var topX = 20;
var topY = 35;

//Other Variables
var curSong = 0;
var music = ["assets/The-Legend-of-Zelda-SHOP-Theme.mp3","assets/Wii-Music.mp3"]; //Don't sue me Nintendo
var sound = true;
var language = "English";
var gender = "male";
var velocity = 2; //speed of character

//Important Keys
var officeOpen = false; //Keep false for game
var superCode = "3507"; //Works everytime
var digit1 = randomNumber(0,9).toString();
var digit2 = randomNumber(0,9).toString();
var digit3 = randomNumber(0,9).toString();
var digit4 = randomNumber(0,9).toString();
var escapeCode = (digit1 + digit2 + digit3 + digit4);
var moneyCollected = false;
var tutorial = true;
var error = false;

//Cycle through examples in Tutorial screen
var examples = ["assets/tut1.png","assets/tut2.png","assets/tut3.png","assets/tut4.png","assets/tut5.png"];
var labels = ["Use Arrow Keys to move","Find items to help you escape","Click E to interact with objects when nearby","Avoid Monsters or other deadly traps","Get out before the timer hits 0"];
var ex = 0;


//For each different screen, the id's are stored in variables
var character = "character1";
var light = "light1";
var rooms = 6;
var places = ["Home","TalkScreen","MainHall","LockScreen","PigRoom","PigScreen","GarageRoom","RobberScreen","OfficeRoom","ComputerScreen","MazeScreen","LawnArea","CellarRoom"];
var lights = 5;
var currentScreen = "Home"; //Initial

//Character Movement
//The X and Y position of the character is the top left corner

var characterX = 0;
var characterY = 0;
var cWidth = getProperty("character1", "width");
var cHeight = getProperty("character1", "height");
var newX;// Adds where they will go
var newY;
var lightX;
var lightY;
var awayX = 315;
var awayY = 415;
var keys = [false, false, false, false]; //Checks which keys are down
//keys[0]: left
//keys[1]: right
//keys[2]: up
//keys[3]: down

//Spider Movement
var spiderX = 255;
var spiderY;
var sWidth = getProperty("spider1","width");
var sHeight = getProperty("spider1","height");

//Make use of array, create character for each screen using code
//Too lazy...

//-----------------------------------------\\
//###%--%&@*---!THE FUNCTIONS!---*@&%--%###\\
//------------------------------------------\\

//Hides all darkness elements
function lightsOn(){
  for (var i = 1; i < lights+1;i++){
    hideElement("light"+i);
  }
}
//lightsOn();//testing

//Out of 100%, each outcome has a different chance: Heads or Tails or...
function coinFlip(coin){
  //console.log(coin);
  if(coin>= 80){ // 20% chance
    setProperty("botOutput","text","Fell into the River :(");
  }
  else if(coin>= 70){ // 10% chance
    setProperty("botOutput","text","Side");
  }
  else if(coin >= 35){ //35% chance
    setProperty("botOutput","text","Tails");
  }
  else{ //35% chance
    setProperty("botOutput","text","Heads");
  }
}

//Shuffle's the position of the cards randomly
function shuffle() {
  for(var c = 0; c < cards.length; c++){
    var die = randomNumber(0,5);  
    var randCard = cards[die];
    var indexCard = cards[c];
    cards[c] = randCard;
    cards[die] = indexCard;
  }
  
  for(var i = 0; i < cards.length; i++){
    setPosition(cards[i],topX,topY);
    topX += 100;
    if ((i+1)% col == 0){
      topY += 110;
      topX = 20;
    }
    
  }
  topX = 20;
  topY = 35;
}

//Goes through Songs in the jukebox
function song(){
  stopSound(music[curSong]);
  curSong ++;
  if (curSong == music.length){
    curSong = 0;
  }
  if (sound == true){
    playSound(music[curSong]);
  }
}

//Put's the real Time and Date on the Computer for fun
var real = timedLoop(1000, function(){
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  var formattedDate = (month + "-" + day + "-" + year);
  setText("realDate", formattedDate);
  
  var hour = currentDate.getHours();
  var minute = currentDate.getMinutes();
  var second = currentDate.getSeconds();
  var formattedTime = (hour + ":" + minute + ":" + second);
  setText("realTime", formattedTime);
});

//Attaches key events to the passed room(Called at bottom)
function ResetKeys(Screen){ 
//When a key is pressed/released in another screen, the onEvent needs to reset
  if (Screen != "Home"){
    Clock(Screen);
  }
  //Starts movement when key is pressed
  onEvent(Screen, "keydown", function(event) { //Allows for diagonal movement
    if (event.key == "Up") {keys[2] = true;}
    else if ((event.key == "Down")) {keys[3] = true;}//Move();}
    else if ((event.key == "Left")) {keys[0] = true;}
    else if ((event.key == "Right")) {keys[1] = true;}
    else if ((event.key == "e")){Interact();}
    
  });
  //Stops movement when key is released
  onEvent(Screen, "keyup", function(event) {
    if (event.key == "Up") {keys[2] = false;} 
    else if ((event.key == "Down")) {keys[3] = false;}
    else if ((event.key == "Left")) {keys[0] = false;}
    else if ((event.key == "Right")) {keys[1] = false;}
    
  });
  
}

//Checks if the character is moving based on if the keys are pressed
function Move() {
  characterX = 0;
  characterY = 0;
  if (keys[0]) {characterX += -velocity;}
  if (keys[1]) {characterX += velocity;}
  if (keys[2]) {characterY += -velocity;}
  if (keys[3]) {characterY += velocity;}
  
 
    //character width: 40, length: 80 
    //character(x,y): (30,330) light(x,y): (-290,-85)
    // character is (-320,-415) away from light
    newX = getXPosition(character)+characterX;// Adds where they will go
    newY = getYPosition(character)+characterY;
    lightX = getXPosition(light)+characterX;
    lightY = getYPosition(light)+characterY;
    
    //It only moves if it is within these borders. Otherwise nothing will happen.
    //If it is not within the borders, than it will not update the character position
    if (newX > 0 && newX + cWidth < 320 && newY > 0 && newY + cHeight < 450 && currentScreen != "LawnArea" && currentScreen != "TileRoom") { 
      setPosition(character, newX, newY); //Make sure character is contained
      setPosition(light, lightX, lightY); //Moves light with character
    }
    //Keep away from Barbed wire fence
    else if (newX > 0 && newX + cWidth < 320 && newY > 200 && newY + cHeight < 450 && currentScreen == "LawnArea"){
      setPosition(character, newX, newY); //Make sure character is contained
    }
    //Keep away from Barbed wire fence
    else if (newX > 0 && newX + cWidth < 320 && (newY > 320 || newY < 70) && newY + cHeight < 450 && currentScreen == "TileRoom"){
      setPosition(character, newX, newY); //Make sure character is contained
    }

}

/*
From MR REIBER.....
var guysToInteractWith = [
  {
    name:robot,
    xMax:??,
    xMin:??,
    yMin:??,
    yMax:??,
    action:function(){
      
    }
  },
  {},
];
  for(guysToInteractWith){
    actualXpos;
    actualYPos;
    if(actualPos == characterRangePos) guysToInteractWith[i].action();
    
  }

*/

//Checks if character is within certain coordinates to interact
function Interact(){
  
  //HOME TO ROBOT
  if (newX + cWidth > 270 && newY < 50 && currentScreen == "Home") {
    Stop();
    setPosition(character, 240, 100);
    setPosition(light,240-awayX,100-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    
    setScreen("TalkScreen");
    
    if(sound == true){
      playSound("assets/category_digital/power_up.mp3");
    }
  }

  //HOME TO COLOR BUTTON
  else if (newX + cWidth > 250 && newY + cHeight > 370 && currentScreen == "Home") {
    Color();
  }
  
  //HOME TO MAIN HALL
  else if (newX > 90 && newX + cWidth < 210 && newY < 150 && currentScreen == "Home") {
    showElement("confirmBkrd2");
    showElement("confirmBtn2");
    showElement("declineBtn2");

  }
  
  //MAIN HALL TO PIG ROOM
  else if (newX < 60 && newY < 300 && newY + cHeight > 230 && currentScreen == "MainHall") {
    Stop();
    setPosition(character, 70, 230); 
    setPosition(light,70-awayX,230-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character3";
    light = "light3";
    
    setScreen("PigRoom");
    currentScreen = "PigRoom";
  
  }
    
    //MAIN HALL TO HOME(Once you start, you can't go back)
    else if (newX > 100 && newX + cWidth < 190 && newY + cHeight > 360 && currentScreen == "MainHall" ){
    
    showElement("homelockLabel");
    if (sound == true){
      playSound("assets/category_puzzle/puzzle_game_lock_magic_b_02.mp3");
    }
    setTimeout(function() {
      hideElement("homelockLabel");
    }, 2000);
    
    /*Stop();
    setPosition(character, 140, 260); 
    setPosition(light,140-awayX,260-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character1";
    light = "light1";
    
    setScreen("Home");
    currentScreen = "Home";*/
   }
  
  //MAIN HALL TO LOCK SCREEN
  else if (newX + cWidth > 110 && newX < 215 && newY < 100 && currentScreen == "MainHall") {
    Stop();
    setPosition(character, 130, 120);
    setPosition(light,130-awayX,120-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    
    currentScreen = "LockScreen";
    setScreen("LockScreen");
  }
  
  //MAIN HALL TO SODA
  else if (newX + cWidth > 270 && newY < 60 && currentScreen == "MainHall") {
    playSound("assets/Bloxy-Cola.mp3");
    hideElement("Soda");
    velocity = 4;
  }
  
  //MAIN HALL TO OFFICE ROOM
  else if (newX + cWidth > 270 && newY < 300 && newY + cHeight > 230 &&  currentScreen == "MainHall") {
    if (officeOpen == true){
      hideElement("Locked");
      if (sound == true){
        playSound("assets/category_puzzle/puzzle_game_lock_magic_a_05.mp3");
      }
    
      Stop();
      setPosition(character, 200, 230);
      setPosition(light,200-awayX,230-awayY);
      newX = getXPosition(character);
      newY = getYPosition(character);
      character = "character4";
      light = "light4";
      setScreen("OfficeRoom");
      currentScreen = "OfficeRoom";
    }
    
    else{
      showElement("lockedLabel");
      setTimeout(function() {
        hideElement("lockedLabel"); //Will have error if spammed(hide instead of delete)
      }, 1000);
      
      if (sound == true){
        playSound("assets/category_puzzle/puzzle_game_lock_magic_b_02.mp3");
      }
    }
  }
  //OFFICE ROOM TO GENERATOR
  else if (newX + cWidth < 150 && newX > 20 && newY < 120 && newY > 20 && currentScreen == "OfficeRoom" ){
    lightsOn();
    if (sound == true){
      playSound("assets/category_digital/power_down_1.mp3");
    }
  }
  //OFFICE ROOM TO DUFFLEBAG
  else if (newX < 80 && newY + cHeight > 370 && currentScreen == "OfficeRoom" ){
    moneyCollected = true;
    hideElement("dufflebag");
    if (sound == true){
      playSound("assets/category_hits/puzzle_game_magic_item_unlock_5.mp3");
    }
  }
  //OFFICE ROOM TO COMPUTER SCREEN
  else if (newX + cWidth> 220 && newY < 230 && newY > 90 && currentScreen == "OfficeRoom" ){
    Stop();
    setPosition(character, 140, 140); 
    setPosition(light,140-awayX,140-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    
    setScreen("ComputerScreen");
  }
  //OFFICE ROOM TO MAIN HALL
  else if (newX < 50 && newY < 300 && newY + cHeight > 230 && currentScreen == "OfficeRoom") {
    Stop();
    setPosition(character, 70, 230); 
    setPosition(light,70-awayX,230-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character2";
    light = "light2";
    
    setScreen("MainHall");
    currentScreen = "MainHall";
  }
  
  //PIG ROOM TO MAIN HALL
  else if (newX + cWidth > 260 && newY > 200 && newY + cHeight < 370 && currentScreen == "PigRoom") {
    Stop();
    setPosition(character, 200, 230);
    setPosition(light,200-awayX,230-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character2";
    light = "light2";
    
    setScreen("MainHall");
    currentScreen = "MainHall";
   }
   
   //PIG ROOM TO GARAGE ROOM
  else if (newX > 110 && newX + cWidth < 190 && newY + cHeight > 310 && currentScreen == "PigRoom") {
    Stop();
    setPosition(character, 140, 260);
    setPosition(light,140-awayX,260-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character5";
    light = "light5";
    
    setScreen("GarageRoom");
    currentScreen = "GarageRoom";
   }
  
  //PIG ROOM TO PIG SCREEN
  else if (newX < 60 && newY + cHeight > 180 && newY < 330 && currentScreen == "PigRoom" ){
    Stop();
    setPosition(character, 85, 220); 
    setPosition(light,85-awayX,220-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    
    setScreen("PigScreen");
  }
  
  //PIG ROOM TO KEY
  else if (newX < 90 && newY < 40 && currentScreen == "PigRoom" ){
    hideElement("key");
    officeOpen = true;
    if (sound == true){
      playSound("assets/category_hits/puzzle_game_magic_item_unlock_5.mp3");
    }
    
  }
  
  //GARAGE ROOM TO PIG ROOM
  else if (newX > 100 && newX + cWidth < 200 && newY < 120 && currentScreen == "GarageRoom") {
    Stop();
    setPosition(character, 130, 120);
    setPosition(light,130-awayX,120-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character3";
    light = "light3";
    
    setScreen("PigRoom");
    currentScreen = "PigRoom";
   }
   
  //GARAGE ROOM TO ROBBER SCREEN
  else if (newX > 30 && newX + cWidth < 170 && newY + cHeight > 320 && currentScreen == "GarageRoom" ){
    Stop();
    setPosition(character, 80, 260); 
    setPosition(light,85-awayX,260-awayY);
    newX = getXPosition(character);
    newY = getYPosition(character);
    
    setScreen("RobberScreen");
  }
  
  //GARAGE ROOM TO LOCKED CAR
  else if (newX < 100 && newY < 270 && currentScreen == "GarageRoom" ){
    showElement("CarLabel");
    setTimeout(function() {
      hideElement("CarLabel");
    }, 2000);
    if (sound == true){
      playSound("assets/category_puzzle/puzzle_game_lock_magic_b_06.mp3");
    }
  }
  
  //GARAGE ROOM TO TIRES
  else if (newX + cWidth > 210 && newY + cHeight > 350 && currentScreen == "GarageRoom" ){
    if (sound == true){
      playSound("assets/category_digital/boing_2.mp3");
    }
  }
  //LAWN AREA TO CELLAR ROOM
  else if (newX < 80 && newY < 330 && currentScreen == "LawnArea" ){
    Stop();
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character7";
    
    setScreen("CellarRoom");
    currentScreen = "CellarRoom";
    
    SpiderCrawl("spider1");
    SpiderCrawl("spider2");
    SpiderCrawl("spider3");
  }
  //CELLAR ROOM TO TILE ROOM
  else if (newX + cWidth < 130 && newX > 20 && newY < 80 && currentScreen == "CellarRoom" ){
    Stop();
    newX = getXPosition(character);
    newY = getYPosition(character);
    character = "character8";
    
    setScreen("TileRoom");
    currentScreen = "TileRoom";
  }

}

//Stops the character from moving
function Stop(){
  keys[0] = false;
  keys[1] = false;
  keys[2] = false;
  keys[3] = false;
  //stopTimedLoop(t); //When you go to another screen, I want the timedLoop to stop
}

//Pig takes the players input and rearranges the text to Igpay Atinlay
function PigLatin() {
  if (sound == true){
    playSound("assets/category_animals/pig.mp3");
  }
  var text = getProperty("pigInput","text");
  setProperty("pigInput","text","");
  var pigText = "";
  var pigList = text.split(" ");
  
  for (var pos = 0; pos < pigList.length; pos++){
    var current = (pigList[pos]).toLowerCase();
    var character = (current.charAt(0)).toLowerCase();
    //console.log(current.charAt(0));
    
    for (var i = vowels.length; i > -1; i--){
      if (character == vowels[i]){
        pigText += current + "ay ";
      }
    }
    if(!isNaN(character)){
      pigText += current + "ay ";
    }
    for (var c = consonants.length; c >-1; c--){
      if (character == consonants[c]){
        current = current.replace(character,"");
        pigText += current + character + "ay ";
      }
    }
    
  }
  setProperty("pigOutput","text",pigText);
}

//Robo takes the players input and responds based on matching words
function Converse(){
  var playerText = getProperty("playerInput","text");
  var lowerText = playerText.toLowerCase();
  var playerLength = playerText.length;
  setProperty("playerInput","text","");
  
  for (var pos = greetings.length; pos > -1; pos --){
    if (lowerText == greetings[pos]) {
      setProperty("botOutput","text","Hello there!");
      if (sound == true){
        playSpeech(getProperty("botOutput","text"), gender, language);}
      return;
    }
  }
  for (pos = agree.length; pos > -1; pos --){
    if (lowerText == agree[pos]) {
      setProperty("botOutput","text","Yes");
      if (sound == true){
        playSpeech(getProperty("botOutput","text"), gender, language);}
      return;
    }
  }
  for (pos = disagree.length; pos > -1; pos --){
    if (lowerText == disagree[pos]) {
      setProperty("botOutput","text","No");
      if (sound == true){
        playSpeech(getProperty("botOutput","text"), gender, language);}
      return;
    }
  }
  
  
  if ((lowerText.includes("where")) || (lowerText.includes("find")) || (lowerText.includes("location"))){
    setProperty("botOutput","text",places[randomNumber(0,places.length -1)]);
  }
  else if ((lowerText.includes("name")) || (lowerText.includes("you called")) || (lowerText.includes("who"))){
    var randa = randomNumber(0,roboname.length -1);
    setProperty("botOutput","text",roboname[randa]);
  }
  else if ((lowerText.includes("how long")) || (lowerText.includes("text length")) || (lowerText.includes("letters"))){
    setProperty("botOutput","text","You typed " + playerLength + " keys!");
  }
  else if ((lowerText.includes("how")) || (lowerText.includes("doing")) || (lowerText.includes("feeling"))){
    var randh = randomNumber(0,feelings.length -1);
    setProperty("botOutput","text",feelings[randh]);
  }
  else if ((lowerText.includes("why")) || (lowerText.includes("know"))){
    var randi = randomNumber(0,answers.length -1);
    setProperty("botOutput","text",answers[randi]);
  }
  else if ((lowerText.includes("your favorite")) || (lowerText.includes("what do you"))){
    var rando = randomNumber(0,favorite.length -1);
    setProperty("botOutput","text",favorite[rando]);
  }
  else if ((lowerText.includes("hate")) || (lowerText.includes("love")) || (lowerText.includes("like"))){
    var randgh = randomNumber(0,likes.length -1);
    setProperty("botOutput","text",likes[randgh]);
  }
  else if ((lowerText.includes("when")) || (lowerText.includes("what time"))){
    var randl = randomNumber(0,times.length -1);
    setProperty("botOutput","text",times[randl]);
  }
  else if ((lowerText.includes("do you")) || (lowerText.includes("is")) || 
  (lowerText.includes("does")) || (lowerText.includes("should"))){
    var randy = randomNumber(0,response.length -1);
    //console.log(randy);
    setProperty("botOutput","text",response[randy]);
  }
  else if ((lowerText.includes("coin")) || (lowerText.includes("heads or tails")) || (lowerText.includes("flip"))){
    var rand = randomNumber(0,101);
    coinFlip(rand); //Gives a random number between 0 and 101
  }
  else{ //If there is no proper response
    var rands = randomNumber(0,random.length -1);
    setProperty("botOutput","text",random[rands]);
  }
  if(sound == true){
    playSpeech(getProperty("botOutput","text"), gender, language);
  }
}

//Color changes the color of the character into something random
function Color(){
  var r = randomNumber(50,255);
  var g = randomNumber(50,255);
  var b = randomNumber(50,255);
  //console.log(rooms.length);
  for (var ch = 1; ch < rooms + 1;ch++){
    setProperty("character" + ch,"icon-color",rgb(r,g,b)); //random color to character
  }
}

//Intro Animation thingy
function Intro(){
  //Intro Time
  if (tutorial == true){
    var f = 1;
    var fade = timedLoop(100,function(){
      setProperty("fadeIn","icon-color",rgb(0,0,0,f));
      f -= 0.02;
      if (f == 0){
        stopTimedLoop(fade);
      }
    });
    
     setTimeout(function() {
        textLabel("thought1","You: Where am I?");
        setProperty("thought1","text-color","white");
        setParent("thought1","intro");
        LevelOne();
        var go = timedLoop(30, function() { //Might Cause Errors
          Move();
        });
        
      }, 8000);
      setTimeout(function() {
        textLabel("thought2","I don't feel so good");
        setProperty("thought2","text-color","white");
        setParent("thought2","intro");
      }, 10600);
      setTimeout(function() {
        textLabel("thought3","???: ╎ ⚍ᓭᒷ ᒲ╎リᒷᓵ∷ᔑ⎓ℸ");
        setProperty("thought3","text-color","red");
        setParent("thought3","intro");
        playSound("assets/category_animals/dinosaur.mp3");
      }, 13000);
      setTimeout(function() {
        textLabel("thought4","I have to get out of here!!!");
        setProperty("thought4","text-color","white");
        setParent("thought4","intro");
      }, 14960);
      setTimeout(function() {
        deleteElement("intro");
      }, 19000);
     
  }
  
  else if (tutorial == false){
    hideElement("fadeIn");
    LevelOne();
    
    var go = timedLoop(20, function() { //Might Cause Errors
      Move();
    });
    
  }
}

//Level 2 CutScene Animation
function Scene2(){
  Stop();
  newX = getXPosition(character);
  newY = getYPosition(character);
  character = "character6"; //It will be able to move the character from the other screen
  setScreen("LawnArea");
  currentScreen = "LawnArea";
  
  //Cutscene Time
  if (tutorial == true){
    var f = 1;
    var fade = timedLoop(100,function(){
      setProperty("fadeIn2","icon-color",rgb(0,0,0,f));
      f -= 0.01;
      if (f == 0){
        stopTimedLoop(fade);
      }
    });
    
    setTimeout(function() {
      textLabel("thought1","You: Finally I made it out!");
      setProperty("thought1","text-color","white");
      setParent("thought1","dialogue1");
    }, 6000);
    
    setTimeout(function() {
      playSound("assets/Electric.mp3");
    }, 7600);
    
    setTimeout(function() {
      textLabel("thought2","The fences have barbed wires. I have to find another way");
      setProperty("thought2","text-color","white");
      setParent("thought2","dialogue1");
    }, 10000);
    
      
    setTimeout(function() {
      deleteElement("dialogue1");
      LevelTwo();
    }, 13000);
      
  }
  else{
    hideElement("fadeIn2");
    LevelTwo();
  }
}

//Countdown Timer that is called throughout screens
var minutes = 30;
var seconds = 0;

function Clock(Screen){
  var clockName = "time" + Screen;
  //console.log(clockName); //All Rooms with clock
  textLabel(clockName,"- -:- -");
  setProperty(clockName,"font-family","Impact");
  setProperty(clockName,"background-color","red");
  setProperty(clockName,"text-color","white");
  setProperty(clockName,"font-size","35");
  setProperty(clockName,"text-align","center");
  setPosition(clockName,"100","0","130","50");
  setParent(clockName,Screen);
}

function Timer(){
  var danger = timedLoop(1000, function() {
    setText("time" + currentScreen, "- -:- -");
    seconds -= 1;
    if (error == true){
      minutes -= 1;
      showElement("minuteLost");
      error = false;
      setTimeout(function() {
        hideElement("minuteLost");
      }, 1500);
      
    }
    if (seconds < 0){
      seconds = 59;
      minutes -= 1;
    }
    if (seconds < 10){
      setText("time" + currentScreen, minutes + ":0" + seconds);
    }
    else{
      setText("time"+ currentScreen, minutes + ":" + seconds);
    }

    if (minutes == 0 && seconds == 0){
      stopTimedLoop(danger);
    }
  });
}

//Creates the escapeCode key for robber
var circleColors = ["pink","cyan","lime","yellow"];
var listCode = [digit1, digit2, digit3, digit4];
var sortedCode = listCode.sort(); //To randomize order
var colorCode = [
  {digit: sortedCode[0],
    color: "", used: false
  },
  {digit: sortedCode[1],
    color: "", used: false
  },
  {digit: sortedCode[2],
    color: "", used: false
  },
  {digit: sortedCode[3],
    color: "", used: false
  }
  ];
var arrayCode = [
  {digit: digit1,
    color: ""
  },
  {digit: digit2,
    color: ""
  },
  {digit: digit3,
    color: ""
  },
  {digit: digit4,
    color: ""
  }
  ];

function CreateKey(){
  for(var i = 0; i < 4; i++){ //Makes Key for number
    colorCode[i].color = circleColors[i]; //Assigns the number with the color
  }
  //Gets it in it's original code form
  for(var i = 0; i < 4; i++){
    for(var j = 0;j < 4;j++){
      if(arrayCode[i].digit == colorCode[j].digit && colorCode[j].used == false){
        arrayCode[i].color = colorCode[j].color;
        colorCode[j].used = true; //Incase there are duplicate numbers in the code
        //console.log(arrayCode[i].digit + arrayCode[i].color);
        setProperty("circle" + i,"icon-color",arrayCode[i].color);
        break; //Breaks out the for loop
      }
    }
  }
}
CreateKey();
//Shows the key of the numbers corresponding with numbers
function ShowKey(money){
  if (money == true){
    setProperty("robberOutput","font-size","15");
    setProperty("robberOutput","text","($⏥$), I heard these numbers are the code for the main door, I just don't know the order");
    hideElement("giveRob");
    hideElement("askRob");
    hideElement("whyRob");
    hideElement("attackRob");
    
    showElement("colorNum");
    showElement("colorKey");
    
    for(var k = 0; k < 4; k++){ //Shows the key
      textLabel("num" + k,sortedCode[k] + " =");
      setParent("num" + k,"colorNum");
      setProperty("num" + k,"text-color","white");
      setProperty("num" + k,"font-size","20");
      
      image("color" + k, "icon://fa-circle"); //Color coded
      setParent("color" + k,"colorKey");
      setProperty("color" + k,"icon-color",circleColors[k]);
      setProperty("color" + k,"width","28");
      
      //colorCode[k].color = circleColors[k]; //Assigns the number with the color
    }
  }
  
  else{
    setProperty("robberOutput","text","No you don't");
  }
}

//Creates a circle to indicate how many examples for the tutorial there are
function Indicators(examples){
  
  for(var i = 0; i <= examples - 1; i++){
    image("ind" + i,"icon://fa-dot-circle-o");
    setProperty("ind" + i,"width",25);
    setProperty("ind" + i,"icon-color","white");
    setParent("ind" + i,"circleParent");
    
  }
  setProperty("ind" + 0,"icon-color",rgb(10,240,250)); //First one is automatically highlighted
}

//Makes spiders move forward and back
function SpiderCrawl(spider){
  var velo = -1;
  var crawl = timedLoop(20,function(){
    spiderX += velo;
    if(spiderX < 0){
      velo = 1;
    }
    if(spiderX > 255){
      velo = -1;
    }
    setPosition(spider,spiderX,getYPosition(spider));
    
    spiderY = getYPosition(spider);
    //console.log(spiderY); //Should log All three spider's Y pos
    if (newY == spiderY && newX == spiderX){
      //console.log("Hit");
    }
  });

}

//Creates a Notepad on all places
var pad = true;
var notes = "";

function NotePad(){
  for (var i = 0; i < places.length;i++){
    var screen = places[i];
    
    button("noteBtn"+screen,"");
    setProperty("noteBtn"+screen,"background-color",rgb(0,0,0,0));
    setProperty("noteBtn"+screen,"border-color",rgb(0,0,0,0));
    setProperty("noteBtn"+screen,"image","assets/note.png");
    setPosition("noteBtn"+screen,50,0,40,40);
    setParent("noteBtn"+screen,screen);
    
    onEvent("noteBtn"+screen,"click",function(){
      if (pad == false){
        notes = getText("note"+screen);
        deleteElement("note"+screen);
        pad = true;
      }
      else{
        textInput("note"+ screen,notes); //HOW TO MAKE TEXTAREA INSTEAD??!!
        setProperty("note"+screen,"placeholder","Notes...");
        setProperty("note"+screen,"text-align","left");
        setProperty("note"+screen,"background-color",rgb(225,210,175,0.9));
        setProperty("note"+screen,"text-color",rgb(0,0,0));
        setPosition("note"+screen,50,100,200,300);
        pad = false;
      }
    });
  }
}

//Creates a 6x5 grid of tiles which the correct tiles
//to click will flash. If a wrong tile is clicked, it resets
var tileX = 25;
var tileY = 150;
var tileR = 6;
var tileKey = [];
var safeTileKey = [];
//Creates the 6x5 grid
function Tiles(){
  var count = 0;
  for (var t = 0; t < 30; t++){
    button("tile"+t,"");
    setPosition("tile"+t,tileX,tileY,45,35);
    setProperty("tile"+t,"background-color",rgb(80,80,100));
    setProperty("tile"+t,"border-color","black");
    setParent("tile"+t,"TileRoom");
    tileX += 45;
    count += 1;
    var state = randomNumber(1,4);
    if (state == 1){
      safeTileKey[safeTileKey.length] = "tile"+t; //The length changes everytime, basically appending it
      tileKey[tileKey.length] = "safe";
    }
    else if (state > 1){
      tileKey[tileKey.length] = "danger";
    }
    if (count == tileR){
      tileX = 25;
      tileY += 35;
      count = 0;
    }
    
  }
}


Tiles();
var showIndex = 0;
var tl;

//Goes through all safe tiles and lights them up
function FlashTiles(){
  if(showIndex < safeTileKey.length)
  {
    setProperty(safeTileKey[showIndex],"background-color","yellow");
    if (sound == true){
      playSound("assets/category_bell/vibrant_game_slot_machine_ding_2.mp3");
    }
    showIndex++;
  }
  else{
    stopTimedLoop(tl);
    setTimeout(function() {
      HideTiles();
    }, 3000);
  }
}

//Goes through all tiles and sets color to normal
function HideTiles(){
    for (var t = 0; t < tileKey.length; t++){
      setProperty("tile"+t,"background-color",rgb(80,80,100));
    }
}

var safeTiles = safeTileKey.length;
var ts = 0;
//Highlights the Tile that the User clicked
function ShowTile(tId){
  
  for (var i = 0; i < safeTileKey.length; i++){
    if(safeTileKey[i] == tId){
      setProperty(tId,"background-color","lime");
      ts ++;
      if (safeTiles == ts){
        if (sound == true){
          playSound("assets/category_alerts/vibrant_game_shutter_alert_1_short_quick.mp3");
        }
        setPosition(character,60,50);
      }
      return; //correct tile found. so return
    }
  }     
  
  //If we reach here then it means an Incorrect Tile was clicked
  setProperty(tId,"background-color","red");
  if (sound == true){
    playSound("assets/category_alerts/vibrant_game_negative_alert.mp3");
  }
  ts = 0;
  setTimeout(function() {
    HideTiles();    
  }, 1000);

}

onEvent("TileRoom","click",function(event){
  if(event.targetId == "flashBtn"){
    showIndex = 0;
    tl = timedLoop(500, function() {
      FlashTiles();
    });
    return;
  }
  else if (event.targetId != "shadow8"){ //We don't want them changed
    ShowTile(event.targetId);
  }
});

//------------------------------------\\
//###%--%&@*---!DO STUFF!---*@&%--%###\\
//------------------------------------\\

//Plays Music based on what the player weants
if (sound == true){
  playSound("assets/Dark-Ambience.mp3",true);
}

onEvent("Playbtn","click",function(){
  setScreen("TutorialScreen");
});

NotePad();
Indicators(examples.length); //Creates Circle Indicators

//Be able to cycle through the guide
onEvent("TutorialScreen","keydown",function(event){
  if (event.key == "Right"){
    if (ex >= examples.length - 1){ //Keep within Boundries
      return;
    }
    else if (ex >= examples.length - 2){
      showElement("TGo");
    }
    setProperty("ind" + ex,"icon-color","white"); //Makes previous circle normal
    ex ++;
    setProperty("ind" + ex,"icon-color",rgb(10,240,250)); //Cyan Color
    
  }
  else if (event.key == "Left"){
    if (ex <= 0){ //Keep within Boundries
      return;
    }
    setProperty("ind" + ex,"icon-color","white");
    ex --;
    setProperty("ind" + ex,"icon-color",rgb(10,240,250));
  }
  
  setProperty("example","image",examples[ex]); //Change to the example of #ex
  setProperty("label","text",labels[ex]);
  return;
});

//Turn indicators into buttons...BUT HOW??!!
onEvent("ind"+0,"click",function(){
  setProperty("ind" + 0,"icon-color",rgb(10,240,250));
});

//Confirmation To skip tutorial and intro
onEvent("TSkip","click",function(){
  showElement("confirmBkrd");
  showElement("confirmBtn");
  showElement("declineBtn");
});

onEvent("confirmBtn","click",function(){
  tutorial = false;
  hideElement("confirmBkrd");
  hideElement("confirmBtn");
  hideElement("declineBtn");
  setScreen("Home");
  Intro();
});

onEvent("declineBtn","click",function(){
  hideElement("confirmBkrd");
  hideElement("confirmBtn");
  hideElement("declineBtn");
});

//Confirmation to start the game
onEvent("confirmBtn2","click",function(){
  hideElement("confirmBkrd2");
  hideElement("confirmBtn2");
  hideElement("declineBtn2");
  
  Stop();
  setPosition(character, 130, 120); 
  setPosition(light,130-awayX,120-awayY);
  newX = getXPosition(character);
  newY = getYPosition(character);
  character = "character2"; //It will be able to move the character from the other screen
  light = "light2"; 
  setScreen("MainHall");
  currentScreen = "MainHall";
  
  Timer();
});

onEvent("declineBtn2","click",function(){
  hideElement("confirmBkrd2");
  hideElement("confirmBtn2");
  hideElement("declineBtn2");
});

//Jumpscare for reasons
onEvent("AAH","click",function(){setScreen("Menu")});

onEvent("Scarebtn","click",function(){
  if (sound == true){
    playSound("assets/Jumpscare.mp3", false);
  }
  showElement("SAD"); 
  setScreen("JumpscareScreen");
});

onEvent("TBack","click",function(){setScreen("Menu")});

//Starts Game immediately or shows intro
onEvent("TGo","click",function(){
  setScreen("Home");
  Intro();
});



//Buttons to return from/send to a screen

onEvent("compBtn","click",function(){setScreen("ComputerScreen");});

onEvent("mazeApp","click",function(){setScreen("MazeScreen");});

onEvent("MazeBack","click",function(){setScreen("ComputerScreen");});

onEvent("PBack","click",function(){setScreen("PigRoom");});

onEvent("LBack","click",function(){setScreen("MainHall");currentScreen = "MainHall"});

onEvent("RBack","click",function(){setScreen("Home");});

onEvent("CompBack","click",function(){setScreen("OfficeRoom");});

onEvent("RobBack","click",function(){setScreen("GarageRoom");});

//Player inputs change output of NPC
onEvent("playerInput","change",Converse);
onEvent("pigInput","change",PigLatin);


//Robber Questions

onEvent("askRob","click",function(){
  if(sound == true){
    playSound("assets/category_human/character_calvin_hello_3.mp3");
  }
  setProperty("robberOutput","text","Help me out. Trying to find a bag of money somewhere");
});
onEvent("whyRob","click",function(){
  setProperty("robberOutput","text","I'm looking for some riches");
});
onEvent("attackRob","click",function(){
  setProperty("robberOutput","text","Wrong Move!");
});
onEvent("giveRob","click",function(){
  ShowKey(moneyCollected);
  });


//Changes player icon-color
onEvent("ColorBtn","click",Color);

//Turns all lights on for visibility
onEvent("lightOn","click",lightsOn);

//Key to exit main door
var code;
onEvent("Enter","click",function(){
  var guess1 = getProperty("digit1","text");
  var guess2 = getProperty("digit2","text");
  var guess3 = getProperty("digit3","text");
  var guess4 = getProperty("digit4","text");
  code = (guess1 + guess2 + guess3 + guess4);
  
  if (code == escapeCode || code == superCode){
    //console.log("You Escaped!! :)");
    if (sound == true){
      playSound("assets/category_bell/vibrant_game_correct_answer_1.mp3");
      Scene2();
    }
  }
  
  else {
    //console.log("Code did not work. :(");
    playSound("assets/category_digital/failure.mp3");
    error = true;
    showElement("errorMessage");
    setTimeout(function() {
      hideElement("errorMessage");
    }, 3000);
    
    setProperty("digit1","placeholder",guess1); //Shows previous Guess
    setProperty("digit2","placeholder",guess2);
    setProperty("digit3","placeholder",guess3);
    setProperty("digit4","placeholder",guess4);
    setProperty("digit1","text",""); //Deletes previous guess
    setProperty("digit2","text","");
    setProperty("digit3","text","");
    setProperty("digit4","text","");

  }
});

//Ability to change gender of robot
onEvent("genderBtn","click",function(){
  if (gender == "male"){
    gender = "female";
    setProperty("genderBtn","background-color","#f176df");
  }
  else if (gender == "female"){
        gender = "male";
        setProperty("genderBtn","background-color","#9a9bf5");
  }
  });


//Allows creepy background music
onEvent("audio","click",function(){
  if (sound == true){
    sound = false;
    stopSound("assets/Dark-Ambience.mp3");
    setProperty("audio","image","icon://fa-volume-off");
  }
  else if (sound == false){
    sound = true;
    playSound("assets/Dark-Ambience.mp3");
    setProperty("audio","image","icon://fa-volume-up");
  }
  });

//Allows movement once called
Clock("LockScreen");

function LevelOne(){
  ResetKeys("MainHall"); //Attaches key events to each room
  ResetKeys("PigRoom");
  ResetKeys("OfficeRoom");
  ResetKeys("GarageRoom");
  ResetKeys("Home");
}

function LevelTwo(){
  ResetKeys("LawnArea");
  ResetKeys("CellarRoom");
  ResetKeys("TileRoom");
}






//----------------------------------------------\\
//###%--%&@*---!CREDITS AND SOURCES!---*@&%--%###\\
//------------------------------------------------\\
/*
Background Music: CO.AG Music https://www.youtube.com/watch?v=zXZsUCwRkPs


*/








//Hi