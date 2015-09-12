var backgroundLayer;
var scoreLayer;
var gameLayer;

var scoreContext;
var gameContext;

var ball;
var playerPaddle;
var aiPaddle;

var p1Score = 0;
var p2Score = 0;

window.onload = function() {
    backgroundLayer = document.getElementById('background');
    drawBackground();

    scoreLayer = document.getElementById('score');
    scoreContext = scoreLayer.getContext('2d');
    drawScores();

    gameLayer = document.getElementById('game');
    gameContext = gameLayer.getContext('2d');

    ball = new Ball(gameLayer);
    playerPaddle = new Paddle(gameLayer, 5);
    aiPaddle = new Paddle(gameLayer, gameLayer.width - 15);
    drawGame();

    (function render(){
      requestAnimationFrame(render);
      update();
      drawGame();
    })();
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
              window.setTimeout(callback, 1000 / 60);
          };
})();

function calculateMousePos(event) {
    var rect = gameLayer.getBoundingClientRect();
    var root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    };
}

function aiMovement() {
    // Only move if the ball is approaching and on the AI paddle's side
    if (ball.velX > 0 && ball.x > gameLayer.width / 2) {
        var center = aiPaddle.y + (aiPaddle.height / 2);
        if (center < ball.y - 35) {
            aiPaddle.move(aiPaddle.y + 6);
        }
        else if (center > ball.y + 35) {
            aiPaddle.move(aiPaddle.y - 6);
        }
    }
}

function update() {
    gameLayer.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerPaddle.move(mousePos.y);
    });
    aiMovement();
    ball.move();
    if (((ball.y + ball.radius) >= gameLayer.height && ball.velY > 0) || ((ball.y - ball.radius) <= 0 && ball.velY < 0)) {
        ball.bounceVelY();
    }

    if (ball.x < 0 || ball.x > gameLayer.width) {
        ball.x > gameLayer.width ? p1Score++ : p2Score++;
        drawScores();
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

function drawBackground() {
    var backgroundContext = backgroundLayer.getContext('2d');
    backgroundContext.fillStyle = 'black';
    backgroundContext.fillRect(0, 0, backgroundLayer.width, backgroundLayer.height);

    // Draw 'net'
    backgroundContext.fillStyle = 'white';
    for (var i = 0; i < backgroundLayer.height; i += 35) {
        backgroundContext.fillRect((backgroundLayer.width / 2) - 1, i, 2, 20);
    }
}

function drawScores() {
    scoreContext.clearRect(0, 0, scoreLayer.width, scoreLayer.height);
    scoreContext.fillStyle = 'white';
    scoreContext.font="30px Arial"
    scoreContext.fillText(p1Score, (scoreLayer.width / 2) - 100 - scoreContext.measureText(p1Score).width, 100);
    scoreContext.fillText(p2Score, (scoreLayer.width / 2) + 100, 100);
}

function drawGame() {
    gameContext.clearRect(0, 0, gameLayer.width, gameLayer.height);
    gameContext.beginPath();
    ball.draw();
    playerPaddle.draw();
    aiPaddle.draw();
    gameContext.closePath();
}
