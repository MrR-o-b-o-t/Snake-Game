
let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let snakeDirection
document.addEventListener("keydown", moveSnakeKeys, false)
let appleX
let appleY
let score = 0
let snakeBody = [
    { x: 50, y: 25, color: 'green' }
]

createApple()

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
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, 15, 15)
    ctx.fill()
    updateScore()
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

function createApple() {
    appleX = Math.floor((Math.random() * (canvas.width - 20)))
    appleY = Math.floor((Math.random() * (canvas.height - 20)))
}

function updateScore() {
    if (snake.x < appleX + 15 &&
        snake.x + 15 > appleX &&
        snake.y < appleY + 15 &&
        snake.y + 15 > appleY
    ) {
        ctx.clearRect(appleX, appleY, 15, 15)
        createApple()
        score = score + 1
        document.getElementById('score').innerText = score
    }
}

// if the snake eats the apple
// check direction of snake
// add new x and y values to snakeBody array
// add new snake body block 'behind' snake head

