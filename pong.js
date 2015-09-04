var canvas;
var canvasContext;
var ball;
var playerPaddle;
var aiPaddle;

window.onload = function() {
    canvas = document.getElementById('pong');
    canvasContext = canvas.getContext('2d');

    ball = new Ball(canvas);
    playerPaddle = new Paddle(canvas, 5);
    aiPaddle = new Paddle(canvas, canvas.width - 15);

    var framesPerSecond = 60;
    setInterval(gameLoop, 1000 / framesPerSecond);
}

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    };
}

function gameLoop() {
    move();
    draw();
}

function move() {
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerPaddle.move(mousePos.y);
    });
    ball.move();

    // Check collisions against the paddle the ball is heading towards
    if (ball.velX < 0) {
        ball.checkCollision(playerPaddle);
    }
    else {
        ball.checkCollision(aiPaddle);
    }
}

function draw() {
    drawCanvas();
    ball.draw();
    playerPaddle.draw();
    aiPaddle.draw();
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}