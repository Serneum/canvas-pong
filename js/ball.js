function Ball(canvas) {
    this.speed = 7.5;
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
        this.velX = getRandomVelocity(this.speed) * Math.cos(angle);
        this.velY = getRandomVelocity(this.speed) * Math.sin(angle);
    },
    move: function() {
        this.x += this.velX;
        this.y += this.velY;
    },
    draw: function() {
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.canvasContext.fill();
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
            var deltaY = this.y - (paddle.y + (paddle.height / 2));
            var normalizedDelta = deltaY / (paddle.height / 2);
            // Max bounce angle is 75 degrees
            var angle = normalizedDelta * (5 * Math.PI / 12);
            // Determine new velocities. Make sure the X velocity sign matches the old sign
            this.velX = this.speed * Math.cos(angle) * (this.velX < 0 ? -1 : 1);
            this.velY = this.speed * Math.sin(angle);
            this.bounceVelX();
        }
    }
};

// Get a random velocity for the ball's initial movement
function getRandomVelocity(speed) {
    return speed * [-1 ,1][Math.round(Math.random())];
}

// Get an angle for the ball's initial movement
function getRandomAngle() {
    // Get a value between -25 and 25
    var angleDifferential = [-1, 1][Math.round(Math.random())] * Math.round(Math.random() * 25);
    // Get a multiplier between 0 and 3
    var multiplier = Math.floor(Math.random() * 4);
    // Get an angle between 20 and 70 degrees in any of the four quadrants
    var degrees = (45 + angleDifferential) + (90 * multiplier);
    return degrees * (Math.PI / 180);
}
