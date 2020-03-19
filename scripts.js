
let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
let snakeDirection
document.addEventListener("keydown", moveSnakeKeys, false)
let appleX
let appleY
let score = 0

createApple()

class Snake {
    constructor() {
        this.body = [
            { x: 50, y: canvas.height / 2 },
            { x: 34, y: canvas.height / 2 },
            { x: 18, y: canvas.height / 2 }
        ]
        this.snakeSpeed = 15
        this.color = 'green'
        this.snakeSize = 15
    }

    drawSnake() {
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, this.snakeSize, this.snakeSize)
        }
        ctx.fill()
    }

    updateSnake() {
        if (snakeDirection === "right") {
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].x += this.snakeSpeed
            }
        } else if (snakeDirection === 'down') {
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].y += this.snakeSpeed
            }
        } else if (snakeDirection === 'left') {
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].x -= this.snakeSpeed
            }
        } else if (snakeDirection === 'up') {
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].y -= this.snakeSpeed
            }
        }
        this.drawSnake()

        if (this.body[0].x > canvas.width - this.snakeSize || this.body[0].x < 0) {
            alert('Game Over!')
        } else if (this.body[0].y > canvas.height - this.snakeSize || this.body[0].y < 0) {
            alert('Game Over!')
        }
    }
}

const snake = new Snake()

function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    snake.updateSnake()
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, 15, 15)
    ctx.fill()
    updateScore()
}

setInterval(animate, 200)

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
    appleX = Math.floor((Math.random() * (canvas.width - 15)))
    appleY = Math.floor((Math.random() * (canvas.height - 15)))
}

function updateScore() {
    if (snake.body[0].x < appleX + 15 &&
        snake.body[0].x + 15 > appleX &&
        snake.body[0].y < appleY + 15 &&
        snake.body[0].y + 15 > appleY
    ) {
        ctx.clearRect(appleX, appleY, 15, 15)
        createApple()
        score = score + 1
        document.getElementById('score').innerText = score
        let xLength = snake.body[snake.body.length - 1].x - 16
        let yLength = snake.body[snake.body.length - 1].y
        snake.body.push({ x: xLength, y: yLength })
    }
}

// if the snake eats the apple
// check direction of snake
// add new x and y values to snakeBody array
// add new snake body block 'behind' snake head
