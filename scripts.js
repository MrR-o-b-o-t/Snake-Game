
let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
document.addEventListener("keydown", moveSnakeKeys, false)
let appleX
let appleY
let score = 0
let snakeDirection;
let grid = 15
let gameIsOver = false;

function handleMouseClick() {
    if (gameIsOver) {
        // ctx.fillStyle = "White"
        // ctx.font = "15px Arial"
        // ctx.fillText(`Game Over! You scored ${score} points! Click to continue.`, 100, 100)
        gameIsOver = false
        score = 0
        document.getElementById('score').innerText = 0
    }
}

createApple()
canvas.addEventListener("mousedown", handleMouseClick)

class Snake {
    constructor() {
        this.body = [
            { x: 45, y: 195 },
            { x: 30, y: 195 },
            { x: 15, y: 195 }
        ]
        this.snakeSpeed = grid
        this.color = 'green'
        this.snakeSize = grid
    }

    drawSnake() {
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, this.snakeSize, this.snakeSize)
            ctx.strokeStyle = "white"
            ctx.strokeRect(this.body[i].x, this.body[i].y, this.snakeSize, this.snakeSize)
        }
        ctx.fill()
    }


    updateSnake() {
        const dir = {
            up: { x: 0, y: -this.snakeSize },
            down: { x: 0, y: this.snakeSize },
            left: { x: -this.snakeSize, y: 0 },
            right: { x: this.snakeSize, y: 0 },
        }[snakeDirection] || { x: 0, y: 0 };
        if (snakeDirection != undefined) {
            this.body.unshift(this.body.pop());
            this.body[0].x = this.body[1].x + dir.x;
            this.body[0].y = this.body[1].y + dir.y;
        }
    }
}

const snake = new Snake()

function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    resetGame()
    if (gameIsOver) {
        return
    } else {
        handleMouseClick()
    }
    snake.updateSnake()
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, grid, grid)
    ctx.fill()
    snake.drawSnake();
    updateScore()
    snakeWallCollision()
    snakeCollision()
    gameOver()
}

setInterval(animate, 100)

function moveSnakeKeys(e) {
    e.preventDefault()
    if (e.code === "ArrowRight" && snakeDirection != "left") {
        snakeDirection = "right";
    } else if (e.code === "ArrowLeft" && snakeDirection != "right") {
        snakeDirection = "left";
    } else if (e.code === "ArrowUp" && snakeDirection != "down") {
        snakeDirection = "up";
    } else if (e.code === "ArrowDown" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}

function createApple() {
    appleX = Math.floor((Math.random() * (canvas.width / grid))) * grid
    appleY = Math.floor((Math.random() * (canvas.height / grid))) * grid
}

function updateScore() {
    if (snake.body[0].x < appleX + grid &&
        snake.body[0].x + grid > appleX &&
        snake.body[0].y < appleY + grid &&
        snake.body[0].y + grid > appleY
    ) {
        let EatSound = new Audio("sounds/EatSound.ogg")
        EatSound.play()
        ctx.clearRect(appleX, appleY, grid, grid)
        createApple()
        score = score + 1
        document.getElementById('score').innerText = score
        growSnake()
    }
}

function growSnake() {
    let xLength = snake.body[snake.body.length - 1].x - grid + 1
    let yLength = snake.body[snake.body.length - 1].y
    snake.body.push({ x: xLength, y: yLength })
}

function gameOver() {
    if (gameIsOver === true) {
        snake.body = [
            { x: 45, y: 195 },
            { x: 30, y: 195 },
            { x: 15, y: 195 }
        ]
        snakeDirection = undefined
    }
}

function snakeWallCollision() {
    if (snake.body[0].x > canvas.width - snake.snakeSpeed + 10 || snake.body[0].x < 0 - 1) {
        gameIsOver = true
    } else if (snake.body[0].y > canvas.height - snake.snakeSpeed + 10 || snake.body[0].y < 0 - 10) {
        gameIsOver = true
    }
}

function snakeCollision() {
    for (let i = 1; i < snake.body.length; i++) {
        let x = snake.body[0].x
        let y = snake.body[0].y
        let snakeBodyY = snake.body[i].y
        let snakeBodyX = snake.body[i].x
        if (x == snakeBodyX && y == snakeBodyY) {
            gameIsOver = true
        }
    }
}

function resetGame(e) {
    if (gameIsOver) {
        ctx.fillStyle = "White"
        ctx.font = "20px Arial"
        ctx.fillText(`Game Over! You score was ${score}! Click anywhere to continue`, 25, 100)
    }
}