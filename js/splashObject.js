let gravity = 0.2;
let friction = 0.99;

class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#f6f6f6";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    this.draw();
  }
}

const title = () => {
  const FONT_NAME = "Oswald-Regular";
  function renderText() {
    ctx.font = `52px "${FONT_NAME}"`;
    ctx.fillStyle = "#f6f6f6";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Instant Lights", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = `20px "${FONT_NAME}"`;
    ctx.fillStyle = "#f6f6f6";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "Press WASD/arrows to move. Point and click to shoot.",
      canvas.width / 2,
      canvas.height / 2 + 30
    );
  }
  document.fonts.load('10pt "Oswald-Regular"').then(renderText);
};