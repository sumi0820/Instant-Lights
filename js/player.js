class Player {
  constructor(x, y, radius, color, score) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;
    this.intervalId = 0;
    this.overKill = false;
  }

  draw() {
    ctxG.beginPath();
    ctxG.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxG.fillStyle = this.color;
    ctxG.shadowColor = '#f6f6f6';
    ctxG.shadowBlur = 15;
    ctxG.fill();
    ctxG.closePath();
  }

  update() {
    this.draw();
  }

  changeBackground() {
    this.intervalId = setInterval(() => {
      const bgColors = [
        "#133b5c",
        "#5d54a4",
        "#423144",
        "#ffc7c7",
        "#206a5d",
        "#7d0633",
        "#cf7500",
        "#ff4b5c",
      ];
      const randomBgColor = () => {
        return bgColors[Math.floor(Math.random() * bgColors.length)];
      };
      TweenMax.to("#main", 5, { backgroundColor: randomBgColor });
      player.overKill = false;
    }, 10000);
  }

  stopChangeBackground(){
    clearInterval(this.intervalId);
  }
}
