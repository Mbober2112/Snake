
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image;
ground.src = "img/ground.png";

const foodImg = new Image;
foodImg.src = "img/food.png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box
};

let stoneLevelTwo = [{x:6,y:7},{x:6,y:8},{x:6,y:9},{x:6,y:10},{x:6,y:11},{x:6,y:12},{x:6,y:13},
                     {x:12,y:7},{x:12,y:8},{x:12,y:9},{x:12,y:10},{x:12,y:11},{x:12,y:12},{x:12,y:13}];

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";    
}

function eatTrail (head, arr){
    for(let i=0; i<arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i=0; i<snake.length; i++){
        ctx.fillStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Score: " + score, box*2, box*1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();
    }

    if(snakeX<box || snakeX>box*17 || snakeY<box*3 || snakeY>box*17){
        clearInterval(game);
    }

    if(dir == "left") snakeX -= box
    if(dir == "right") snakeX += box
    if(dir == "up") snakeY -= box
    if(dir == "down") snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTrail(newHead, snake);

    switch(score) {
        case 5: clearInterval(game);
        game = setInterval(drawGame, 350);
        break;
        case 10: clearInterval(game);
        game = setInterval(drawGame, 300);
        break;
        case 15: clearInterval(game);
        game = setInterval(drawGame, 250);
        break;
        case 20: clearInterval(game);
        game = setInterval(drawGame, 200);
        break;
        case 25: clearInterval(game);
        game = setInterval(drawGame, 150);
        break;
        case 30: clearInterval(game);
        snake = [];
        snakeX = 9*box;
        snakeY = 10*box;
        newHead.x = snakeX;
        newHead.y = snakeY;
        game = setInterval(drawGame2, 400);
        dir = "";
        break;    
    }

    snake.unshift(newHead);
};

function drawGame2() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    if((food.x==6*box && 7*box<=food.y && food.y<=13*box) || (food.x==12*box && 7*box<=food.y && food.y<=13*box)){
        food.x = food.x+1*box;
    }

    for (let i=0; i<snake.length; i++){
        ctx.fillStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    for (let i=0; i<stoneLevelTwo.length; i++){
        ctx.fillStyle = "grey";
        ctx.fillRect(stoneLevelTwo[i].x*box, stoneLevelTwo[i].y*box, box, box);
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Score: " + score, box*2, box*1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        if((food.x==6*box && 7*box<=food.y && food.y<=13*box) || (food.x==12*box && 7*box<=food.y && food.y<=13*box)){
            food.x = food.x+1*box;
        }
    } else {
        snake.pop();
    }

    if((snakeX<box || snakeX>box*17 || snakeY<box*3 || snakeY>box*17)||
    ((snakeX==6*box && 7*box<=snakeY && snakeY<=13*box) || (snakeX==12*box && 7*box<=snakeY && snakeY<=13*box))){
        clearInterval(game);
    }

    if(dir == "left") snakeX -= box
    if(dir == "right") snakeX += box
    if(dir == "up") snakeY -= box
    if(dir == "down") snakeY += box

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTrail(newHead, snake);

    switch(score) {
        case 35: clearInterval(game);
        game = setInterval(drawGame2, 350);
        break;
        case 40: clearInterval(game);
        game = setInterval(drawGame2, 300);
        break;
        case 45: clearInterval(game);
        game = setInterval(drawGame2, 250);
        break;
        case 50: clearInterval(game);
        game = setInterval(drawGame2, 200);
        break;
        case 55: clearInterval(game);
        game = setInterval(drawGame2, 150);
        break;
        case 60: clearInterval(game);
        break;    
    }

    snake.unshift(newHead);
};

let game = setInterval(drawGame, 400);

