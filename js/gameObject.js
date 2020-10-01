//============PLAYER============//
class Player {
  constructor(x, y, radius, color, score) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = score;
    this.intervalId = 0;
    this.overKill = false;
    this.shield = false;
    this.specialEffect = false;
  }

  draw() {
    ctxG.beginPath();
    ctxG.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxG.fillStyle = this.color;
    ctxG.shadowColor = "#f6f6f6";
    ctxG.shadowBlur = 20;
    ctxG.fill();
    ctxG.closePath();
  }

  update() {
    this.draw();
  }

  changeBackground() {
    this.intervalId = setInterval(() => {
      TweenMax.to("#main", 5, { backgroundColor: randomColor(bgColors) });
      player.overKill = false;
      player.specialEffect = false;
    }, 10000);
  }
  stopChangeBackground() {
    clearInterval(this.intervalId);
  }
}

//============BEAM============//
class Beam {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
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

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//============ENEMY============//
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.difficulty = false;
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
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
