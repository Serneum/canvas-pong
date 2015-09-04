var canvas;
var canvasContext;
var ball;
var playerPaddle;
var aiPaddle;
var p1Score = 0;
var p2Score = 0;

window.onload = function() {
    canvas = document.getElementById('pong');
    canvasContext = canvas.getContext('2d');

    ball = new Ball(canvas);
    playerPaddle = new Paddle(canvas, 5);
    aiPaddle = new Paddle(canvas, canvas.width - 15);

    var framesPerSecond = 60;
    setInterval(function() {
        update();
        draw();
    }, 1000 / framesPerSecond);
}

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    };
}

function update() {
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerPaddle.move(mousePos.y);
    });
    ball.move();
    if ((ball.y + ball.radius) >= canvas.height || (ball.y - ball.radius) <= 0) {
        ball.bounceVelY();
    }

    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x > canvas.width ? p1Score++ : p2Score++;
        ball.reset();
    }

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
    drawScores();
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScores() {
    canvasContext.fillStyle = 'white';

    // Draw 'net'
    for (var i = 0; i < canvas.height; i += 40) {
        canvasContext.fillRect((canvas.width / 2) - 1, i, 2, 20);
    }

    canvasContext.font="30px Arial"
    canvasContext.fillText(p1Score, (canvas.width / 2) - 100 - canvasContext.measureText(p1Score).width, 100);
    canvasContext.fillText(p2Score, (canvas.width / 2) + 100, 100);
}