function Ball(canvas) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.radius = 10;

    // Start in the middle of the canvas
    this.x = (this.canvas.width / 2) - this.radius;
    this.y = (this.canvas.height / 2) - this.radius;

    // Random starting direction/angle
    this.velX = 5;
    this.velY = 5;
};

Ball.prototype = {
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
        if (this.x >= this.canvas.width || this.x <= 0) {
            this.velX = -this.velX;
        }

        if (this.y >= this.canvas.height || this.y <= 0) {
            this.velY = -this.velY;
        }
    }
};