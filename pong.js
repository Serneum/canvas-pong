var canvas;
var canvasContext;
var ball;
// var playerPaddle = new Paddle(canvas, 0);
// var aiPaddle = new Paddle(canvas, canvas.width - 10, 375);

window.onload = function() {
    canvas = document.getElementById('pong');
    canvasContext = canvas.getContext('2d');

    ball = new Ball(canvas);

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
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}