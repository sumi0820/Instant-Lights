class Ripple {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.stroke = {
      width: 0,
      color: color,
    };
  }

  draw() {
    ctxG.globalAlpha = this.opacity || 1;
    ctxG.beginPath();
    ctxG.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    // if (this.stroke) {
    ctxG.strokeStyle = this.stroke.color;
    ctxG.lineWidth = this.stroke.width;
    ctxG.stroke();
    // }
    // if (this.fill) {
    //   ctxG.fillStyle = this.fill;
    //   ctxG.fill();
    // }
    // ctxG.closePath();
    ctxG.globalAlpha = 1;
  }

  update() {
    this.draw();
  }
}

function rippleEvent(enemy) {
  let rippleSize = Math.min(200, canvasG.width * 0.4);

  let ripple = new Ripple(enemy.x, enemy.y, 1, enemy.color, 0, {
    width: 3,
    color: enemy.color,
  });
//   console.log(ripple);

  let rippleAnimation = anime({
    targets: ripple,
    radius: rippleSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: removeParticle,
  });

  animations.push(rippleAnimation);
  animatePart();
//   console.log(animations);
}


function protectPlayer(player) {
//   console.log(player);
  let shieldSize = 100

  let shield = new Ripple(player.x, player.y, 1, player.color, 0, {
    width: 3,
    color: player.color,
  });
//   console.log(shield);

  let shieldAnimation = anime({
    targets: shield,
    radius: shieldSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: removeParticle,
  });

  animations.push(shieldAnimation);
  animatePart();
//   console.log(animations);
}
