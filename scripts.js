
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d')
let direction = false;
let snakeX = canvas.width / 2;
let snakeY = canvas.height - canvas.height / 2;
let snakeSpeedX = 2;
let snakeSpeedY;

window.onload = function () {
    ctx.beginPath()
    window.addEventListener('keydown', moveSnake, false);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    moveSnake();
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(snakeX, snakeY, 25, 25);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    snakeX += snakeSpeedX
}

setInterval(draw, 70);


function moveSnake(e) {
    switch (e.keyCode) {
        case 37:
            snakeX -= 2;
            break;

        case 38:
            snakeY -= 2;
            break;

        case 39:
            snakeX += 2;
            break;

        case 40:
            snakeY += 2;
            break;
    }

    e.preventDefault();

    drawSnake();
}
