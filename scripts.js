
let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let snakeDirection;
document.addEventListener("keydown", moveSnakeKeys, false)
let appleX;
let appleY;

class Snake {
    constructor() {
        this.x = 50
        this.y = canvas.height / 2
        this.snakeSpeed = 1
        this.color = 'green'
        this.snakeSize = 15
    }

    drawSnake() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.snakeSize, this.snakeSize)
        ctx.fill()
    }

    updateSnake() {
        if (snakeDirection === "right") {
            this.x += this.snakeSpeed
        } else if (snakeDirection === 'down') {
            this.y += this.snakeSpeed
        } else if (snakeDirection === 'left') {
            this.x -= this.snakeSpeed
        } else if (snakeDirection === 'up') {
            this.y -= this.snakeSpeed
        }
        this.drawSnake()

        if (this.x > canvas.width - this.snakeSize || this.x < 0) {
            alert('Game Over!')
        } else if (this.y > canvas.height - this.snakeSize || this.y < 0) {
            alert('Game Over!')
        }
    }
}

const snake = new Snake()

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    snake.updateSnake()
    createApple()
}

animate()

function moveSnakeKeys(e) {
    if (e.code === "ArrowRight" && snakeDirection != "left") {
        console.log("snake arrow right")
        snakeDirection = "right";
    } else if (e.code === "ArrowLeft" && snakeDirection != "right") {
        snakeDirection = "left";
        console.log("snake arrow left")
    } else if (e.code === "ArrowUp" && snakeDirection != "down") {
        console.log("snake arrow up")
        snakeDirection = "up";
    } else if (e.code === "ArrowDown" && snakeDirection != "up") {
        console.log("snake arrow down")
        snakeDirection = "down";
    }
}

// Math.random for generating x and y cordinate for apple
// draw apple on canvas using these cordinates
// check to see if apple exists
// if true then don't run
// if snakex or snakey is equal to applex or appley add 1 point and remove old apple, create new apple

function createApple() {
    appleX = Math.floor((Math.random() * canvas.width) - 15)
    appleY = Math.floor((Math.random() * canvas.height) - 15)
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, 15, 15)
    ctx.fill()
}

// if snake x and y == apple x and y 
// add 1 point 
// remove that apple
// call createApple function
// draw new apple to canvas