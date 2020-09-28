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
    ctxG.closePath();
  }

  update() {
    this.draw();
  }
}

let animations = [];

const removeParticle = (animation) => {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
};

function particleEvent(enemy) {
  let particles = [];

  for (let i = 0; i < 20; i++) {
    let particle = new Particle(
      enemy.x,
      enemy.y,
      anime.random(20, 50),
      randomParticleColor(particleColors)
    );
    particles.push(particle);
  }

  let particlesAnimation = anime({
    targets: particles,
    x: function (particle) {
      return (
        particle.x + anime.random(particle.radius + 10, -particle.radius - 10)
      );
    },
    y: function (particle) {
      return (
        particle.y +
        anime.random(particle.radius * 1.15 + 10, -particle.radius * 1.15 + 10)
      );
    },
    radius: 0,
    easing: "easeOutExpo",
    duration: anime.random(1000, 1300),
    complete: removeParticle,
  });

  animations.push(particlesAnimation);
  animatePart();
}

function animatePart() {
  anime({
    duration: Infinity,
    update: function () {
      animations.forEach(function (anim) {
        anim.animatables.forEach(function (animatable) {
          animatable.target.draw();
        });
      });
    },
  });
}
