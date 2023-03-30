// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
// snake body
var snakeBody = [];
// velocity 
var velocityX = 0;
var velocityY = 0;
// food 
var foodX;
var foodY;

// score - keep track of the users points
var score;
var scoreVal = 0;


var startScreen;
var endScreen;


// when window is loading initialize our objects and board
window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;

    score = document.getElementById("score");
    startScreen = document.getElementById("startScreen");
    endScreen = document.getElementById("endScreen");

    // used for drawing on the board
    context = board.getContext("2d");
    // randomly place food within board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update/draw game board
    // update();
    // runs every 100 milliseconds 
    setInterval(update, 1000 / 10)
}



// function that updates the game state for the user - draws items and updates score
function update() {


    // draw board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //show score
    score.textContent = "Score:" + scoreVal.toString();

    // draw food
    context.fillStyle = "#62BEC1";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // when food is eaten replace food in new spot and add to snake body 
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        scoreVal += 1;
    }

    // let snake body follow its predecsors 
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    // connect snake body to head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // draw snake
    context.fillStyle = "#996888";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // draw body as it is created
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // gameover conditions 
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOverMessage();
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOverMessage();
        }
    }




}
// function that placed food at random location within board
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// function that enable keyboard input inorder to change snakes location
function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1 || e.code === "KeyW" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY !== -1 || e.code === "KeyS" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code === "ArrowLeft" && velocityX !== 1 || e.code === "KeyA" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowRight" && velocityX !== -1 || e.code === "KeyD" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }

}

// implement a starting and ending screen 
function startGame() {
    startScreen.style.display = 'none';
    board.style.display = 'block';
    score.style.display = 'block';
    repalyed = false;

}

function gameOverMessage() {
    board.style.display = 'none';
    endScreen.style.display = 'block';
    score.style.display = 'none';
    document.getElementById("endMessage").textContent = "GAME OVER. " + "Your Final Score is " + scoreVal.toString() + "!";

}
function replay() {
    window.location.reload();
}