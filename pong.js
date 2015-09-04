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

function gameLoop() {
    move();
    draw();
}

function move() {
    ball.move();
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