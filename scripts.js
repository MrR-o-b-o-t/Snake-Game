
let canvas = document.getElementById('gameCanvas')
let ctx = canvas.getContext('2d')
document.addEventListener("keydown", moveSnakeKeys, false)
let appleX
let appleY
let score = 0
let snakeDirection;

createApple()

class Snake {
    constructor() {
        this.body = [
            { x: 50, y: 200 },
            { x: 36, y: 200 },
            { x: 21, y: 200 }
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

    // check direction of snake (if moving)
    // remove snake 'tail'
    // check empty space at head of snake using snakeDirection 
    // replace that empty space with snake 'tail'

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
    snake.updateSnake()
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX, appleY, 15, 15)
    ctx.fill()
    snake.drawSnake();
    updateScore()
    gameOver()
}

setInterval(animate, 200)

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
        growSnake()
    }
}

function growSnake() {
    let xLength = snake.body[snake.body.length - 1].x - 16
    let yLength = snake.body[snake.body.length - 1].y
    snake.body.push({ x: xLength, y: yLength })
}

function gameOver() {
    if (snake.body[0].x > canvas.width - snake.snakeSpeed || snake.body[0].x < 0) {
        alert('Game Over!')
    } else if (snake.body[0].y > canvas.height - snake.snakeSpeed || snake.body[0].y < 0) {
        alert('Game Over!')
    }
}

