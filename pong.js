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

    // usage:
    // instead of setInterval(render, 16) ....
    (function animloop(){
      requestAnimFrame(animloop);
      update();
      draw();
    })();
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
              window.setTimeout(callback, 1000 / 60);
          };
})();

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
        x: event.clientX - rect.left - root.scrollLeft,
        y: event.clientY - rect.top - root.scrollTop
    };
}

function aiMovement() {
    // Only move if the ball is approaching and on the AI paddle's side
    if (ball.velX > 0 && ball.x > canvas.width / 2) {
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
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        playerPaddle.move(mousePos.y);
    });
    aiMovement();
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
    canvasContext.beginPath();
    drawCanvas();
    ball.draw();
    playerPaddle.draw();
    aiPaddle.draw();
    drawScores();
    canvasContext.closePath();
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScores() {
    canvasContext.fillStyle = 'white';

    // Draw 'net'
    for (var i = 0; i < canvas.height; i += 35) {
        canvasContext.fillRect((canvas.width / 2) - 1, i, 2, 20);
    }

    canvasContext.font="30px Arial"
    canvasContext.fillText(p1Score, (canvas.width / 2) - 100 - canvasContext.measureText(p1Score).width, 100);
    canvasContext.fillText(p2Score, (canvas.width / 2) + 100, 100);
}
