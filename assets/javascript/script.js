// draw alphabet buttons
function drawAlphabetButtons() {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
    let input = "";
    for (let i = 0; i < alphabet.length; ++i) {
        input += `<input type="text" class="input_text" 
                    value="${alphabet[i]}" onClick="checkLetter(this.value); 
                    gameManager()" readonly>`;
        if(i == 11 ) {
            input += "</br>";
        }
    }
    document.getElementById("buttons_aphabet").innerHTML = input;
}

// initialize canvas
let canvas = document.getElementById("canvasHangman");
let ctx = canvas.getContext("2d");
// function for drawing lines
function drawLine(ctx, x1, y1, x2, y2, width = 3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.stroke();
}
function drawCircle (ctx, x1, y1, r, width = 3) {
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, 2 * Math.PI, false);
    ctx.arcWidth = width;
    ctx.stroke();
}
function drwaStage() {
    // Draw stage
    drawLine(ctx, 10, 250, 120, 250, 2);
    drawLine(ctx, 60, 250, 60, 40, 2);
    drawLine(ctx, 60, 40, 210, 40, 2);
    drawLine(ctx, 210, 40, 210, 80, 2);
}

// function for drawing hangman
function drawHangman () {
    if (gameLives == 14) {
        //head
        drawCircle(ctx, 210, 95, 15, 2);
    } else if (gameLives == 13) {
        //neck and torso
        drawLine(ctx, 210, 110, 210, 190, 2);
    } else if (gameLives == 12) {
        //left leg
        drawLine(ctx, 210, 190, 170, 220, 2);
    } else if (gameLives == 11) { 
        //rigth leg
        drawLine(ctx, 210, 190, 250, 220, 2);
    } else if (gameLives == 10) {
        //left arm
        drawLine(ctx, 210, 120, 170, 150, 2);
    } else if (gameLives == 9) { 
        //rigth arm
        drawLine(ctx, 210, 120, 250, 150, 2);
    } else if (gameLives == 8) { 
        //left foot
        drawLine(ctx, 170, 220, 160, 220, 2);
    } else if (gameLives == 7) { 
        //rigth foot
        drawLine(ctx, 250, 220, 260, 220, 2);        
    } else if (gameLives == 6) { 
        //left hand
        drawLine(ctx, 170, 150, 160, 150, 2);        
    } else if (gameLives == 5) { 
        //rigth hand
        drawLine(ctx, 250, 150, 260, 150, 2);        
    } else if (gameLives == 4) { 
        //left eye
        drawCircle(ctx, 205, 92, 2, 2);        
    } else if (gameLives == 3) { 
        //rigth eye
        drawCircle(ctx, 215, 92, 2, 2);        
    } else if (gameLives == 2) { 
        //nose
        drawLine(ctx, 210, 92, 210, 100, 2);        
    } else if (gameLives == 1) { 
        //mouth
        drawLine(ctx, 205, 105, 215, 105, 2);        
    } else if (gameLives == 0) { 
        //end
        drawLine(ctx, 190, 117, 250, 117, 2);        
    } 
}

let inputField = document.getElementById("inputStartgame")
inputField.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("startgame").click();
    }
  }); 

function containsNumbers(str) {
    return /[0-9]/.test(str);
}
// game variables
let charArray = [];
let arraySize
let letterFound = 0;
let lives = 15;
let gameLives = lives;
let gameStatus = 1;
// function for starting game
function startGame() {
    gameLives = lives;
    gameStatus = 1;
    letterFound = 0;
    let input = document.getElementById("inputStartgame").value;
    if (input == "") {
        window.alert("You must enter a word");
    } else if (containsNumbers(input)) {
        window.alert("The word must only letters");
    } else {
        //split string into character array
        charArray = input.split('');
        //save array length
        arraySize = charArray.length
        //generate missing word 
        generateButtons(arraySize);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw stage
        drwaStage();
        drawAlphabetButtons();
        document.getElementById("user_message").innerHTML = "Select a letter. Number of tries remaining: " + gameLives;
        document.getElementById("print").innerHTML = "Hangman Game";
    }
    document.getElementById("inputStartgame").value = "";
}
// game manager for win or loose condition
function gameManager() {
    if (letterFound == arraySize) {
        gameStatus = 0;
        document.getElementById("print").innerHTML = "YOU WON GAME OVER";
    } else if (gameLives == 0) {
        gameStatus = 0;
        document.getElementById("print").innerHTML = "YOU LOST GAME OVER";
    }
}
// function for generating hangman missing letters
function generateButtons(size) {
    let buttons = "";
    for (let i = 0; i < size; ++i) {
        buttons += '<input id="' + i + '" type="text" class="input_text" value="" disabled>' ;
    }
    document.getElementById("inner_text").innerHTML = buttons;
}
// function for checking if a pressed letter exists
function checkLetter(val){
    if (gameStatus == 1) {
        let found = 0
        for (let i = 0; i < arraySize; ++i) {
            if (val == charArray[i]) {
                document.getElementById(i).value = val;
                found = 1;
                ++letterFound;
            }
        }
        if (found == 0) {
            --gameLives;
            drawHangman();
            document.getElementById("user_message").innerHTML = "You guessed wrong! Number of tries remaining: " + gameLives;
        } else {
            document.getElementById("user_message").innerHTML = "You guessed it rigth! Number of tries remaining: " + gameLives;
        }
    }
}
