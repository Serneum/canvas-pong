function Ball(canvas) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.radius = 10;
    this.reset();
};

Ball.prototype = {
    reset: function() {
        // Start in the middle of the canvas
        this.x = (this.canvas.width / 2) - this.radius;
        this.y = (this.canvas.height / 2) - this.radius;

        // Random starting direction/angle
        var angle = getRandomAngle();
        this.velX = getRandomVelocity() * Math.cos(angle);
        this.velY = getRandomVelocity() * Math.sin(angle);
    },
    move: function() {
        this.x += this.velX;
        this.y += this.velY;
        this.bounce();
    },
    draw: function() {
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.canvasContext.fill();
    },
    bounce: function() {
        if (this.y >= this.canvas.height || this.y <= 0) {
            this.bounceVelY();
        }

        if (this.x < 0 || this.x > this.canvas.width) {
            this.reset();
        }
    },
    bounceVelX: function() {
        this.velX = -this.velX;
    },
    bounceVelY: function() {
        this.velY = -this.velY;
    },
    checkCollision: function(paddle) {
        // Adjust the collision detection to the right side of the paddle if we are checking against the left paddle
        var paddleCollision = paddle.x;
        if (this.x < (this.canvas.width / 2)) {
            paddleCollision += paddle.width;
        }

        if (this.y > paddle.y && this.y < (paddle.y + paddle.height) && (Math.abs(this.x - paddleCollision) < paddle.width)) {
            this.bounceVelX();
        }
    }
};

function getRandomVelocity() {
    return 5 * [-1 ,1][Math.round(Math.random())];
}

// There's a chance the ball could end up at an angle that take forever to get to a player. Fine-tune later
function getRandomAngle() {
    // Never get an angle that is purely horizontal or vertical
    var angle;
    do {
        angle = Math.round(Math.random() * 340) + 20;
    } while (angle % 90 == 0);
    return angle;
}