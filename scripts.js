
let canvas;
let canvasContext;
let snakeX = 278;
let snakeY = 200;

window.onload = function () {
    window.addEventListener('keydown', moveSnake, false);
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d')
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    moveSnake();
}

function drawSnake() {
    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(200, 200, 25, 25);
    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(226, 200, 25, 25);
    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(252, 200, 25, 25);
    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(snakeX, snakeY, 25, 25);
}

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