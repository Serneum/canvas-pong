function Paddle(canvas, x) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.width = 10;
    this.height = 100;

    this.x = x;
    // Center the paddle vertically
    this.y = (canvas.height - this.height) / 2;
};

Paddle.prototype = {
    move: function(newY) {
        this.y = newY;
    },
    draw: function() {
        this.canvasContext.fillStyle = 'white';
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }
};