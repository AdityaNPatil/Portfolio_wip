/*
MY STEPS
1. Create a function that selects a random color from array of color btn and stores that color in a new array for record and later checking
1a. Animate every time game gives a certain input/btn color
1b. Add Sound to each time game gives input

2. Start the game only when a certain key is pressed

3. Begin taking user input - Store it in a new array for record 
3a. Animate every time user choses a button
3b. Add sound whenever button clicked
3c. Change the text of title everytime user clears a level

4. Check If user input correct by checking the last Entries in the gamePattern and user Pattern arrays
4a . If correct console log success and call nextButton() function to proceed to next Level 
4b While calling nextButton() function we must reset the userPattern array so that eac time user has to click from the beginning
4c If incorrect then reset the game by calling resetGame() function which changes title text and resets level to zero and started variable to false also it clears the gamePattern and userPattern arrays 

*/ 

// 1
var btnColors = ["yellow","red","green","blue"];
var gamePattern = [];
// 3 
var userPattern = [];
// 2 - variable to store the current status of the game (if started or not)
var started = false;
// 3c - Checking level of the game
var level = 0;


// 2
document.addEventListener("keydown", function(event){
    var pressedKey = event.key;
    if(pressedKey == "s" || pressedKey == "S"){
        started = true;
        nextButton();
    }
});

// 3
$(".btn").click(function (event){
    var pressedButton = event.target.getAttribute("id");
    // Storing the pressed button in array 
    userPattern.push(pressedButton);
    // 3a Flashing on clicking button
    flashEffect(pressedButton);
    // 3b Playing sound on clicking button
    playSound(pressedButton);
    // 4 check answer by passing the last element that was pushed into the array
    checkAswer(userPattern.length-1);
});

// 4
function checkAswer(answerIndex){
    // 4a
    if(gamePattern[answerIndex] === userPattern[answerIndex]){
        if(gamePattern.length === userPattern.length){
            console.log("Success");
            // Calling the nextButton function only after 1 second
            setTimeout(nextButton, 1000);
        }
    }
    // 4c
    else{
        console.log("Failed");
        resetGame();
    }
}

// 1
function nextButton(){
    // 3c Changing text of title to corresponding level
    level++;
    document.querySelector("#levelTitle").innerHTML="Level "+level;
    // 4b
    userPattern = [];

    // Selecting random index from array of colors
    var randomIndex = Math.random()*3;
    randomIndex = Math.round(randomIndex);

    // Selecting random color from array of colors and storing it in game Pattern Array 
    var randomColor = btnColors[randomIndex];
    gamePattern.push(randomColor);

    // Flashing chosen color
    flashEffect(randomColor);
    // Playing Sound whenever color chosen by game
    playSound(randomColor);
}

// 4c
function resetGame(){
    level = 0;
    document.querySelector("#levelTitle").innerHTML="Game Over , Press S to Restart";
    gamePattern = [];
    userPattern = [];
    started = false;

    // Adding a red background color to the body every time user fails and remove it in 2ms
    document.querySelector(".mainContainer").classList.add("gameOver");
    setTimeout(function(){
        document.querySelector(".mainContainer").classList.remove("gameOver");
    },200);
}

// 1a, 3a
function flashEffect(colorName){
    var chosenClr = $("#"+colorName);
    chosenClr.fadeIn(200).fadeOut(200).fadeIn(200);
}

// 1b, 3b
function playSound(colorName){
    var audio = new Audio("./sounds/"+colorName+".mp3"); 
    audio.play();
}