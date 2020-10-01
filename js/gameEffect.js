//============PARTICLE============//
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctxG.beginPath();
    ctxG.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxG.fillStyle = this.color;
    ctxG.fill();
    // ctxG.closePath();
    // ctxG.globalAlpha = 1;
  }

  update() {
    this.draw();
  }
}

let animations = [];
let particles = [];

function particleEvent(obj) {
  setTimeout(() => {
    for (let i = 0; i < 15; i++) {
      let particle = new Particle(
        obj.x,
        obj.y,
        anime.random(24, 60),
        randomColor(particleColors)
      );
      particles.push(particle);
    }

    let particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return (
          particle.x + anime.random(particle.radius + 20, -particle.radius + 20)
        );
      },
      y: function (particle) {
        return (
          particle.y +
          anime.random(
            particle.radius * 1.15 + 20,
            -particle.radius * 1.15 + 20
          )
        );
      },
      radius: 0,
      easing: "easeOutExpo",
      duration: anime.random(500, 1000),
      complete: removeEffect,
    });

    animations.push(particlesAnimation);
    animatePart();
  }, 0);
}

//============RIPPLE============//

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

  let rippleAnimation = anime({
    targets: ripple,
    radius: rippleSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 900,
    complete: removeEffect,
  });

  animations.push(rippleAnimation);
  animatePart();
}


function protectPlayer(player) {
  let shieldSize = 100

  let shield = new Ripple(player.x, player.y, 1, player.color, 0, {
    width: 3,
    color: player.color,
  });

  let shieldAnimation = anime({
    targets: shield,
    radius: shieldSize,
    opacity: 0,
    easing: "easeOutExpo",
    duration: 450,
    complete: removeEffect,
  });

  animations.push(shieldAnimation);
  animatePart();
}


//============FUNCTION============//

const removeEffect = (animation) => {
  setTimeout(() => {
    let index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
    particles.splice(0, 10);
  }, 0);
};

function animatePart() {
  anime({
    duration: 1000,
    update: function () {
      animations.forEach(function (anim) {
        anim.animatables.forEach(function (animatable) {
          animatable.target.draw();
        });
      });
    },
  });
}
