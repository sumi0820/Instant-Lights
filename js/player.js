class Player {
  constructor(x, y, radius, color, score) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;
  }

  draw() {
    ctxG.beginPath();
    ctxG.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxG.fillStyle = this.color;
    ctxG.fill();
    ctxG.closePath();
  }

  update() {
    this.draw();
  }
}
