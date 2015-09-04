var Ball = function(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.radius = 10;

    // Start in the middle of the canvas
    this.x = (canvas.width / 2) - this.radius;
    this.y = (canvas.height / 2) - this.radius;

    // Random starting direction/angle
    this.velX = 5;
    this.velY = 5;
};

Ball.prototype = {
    move: function() {
        this.x += velX;
        this.y += velY;
        bounce();
    },
    draw: function() {
        canvasContext.fillStyle = 'white';
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    },
    bounce: function() {
        if (this.x >= canvas.width || this.x <= 0) {
            this.velX = -this.velX;
        }

        if (this.y >= canvas.height || this.y <= 0) {
            this.velY = -this.velY;
        }
    }
};