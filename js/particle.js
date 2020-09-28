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
let particles = [];

const removeParticle = (animation) => {
//   animations.forEach((elem,index) => {
//     animations.splice(index, 1);
//   });
//   particles.forEach((elem,index) => {
//     particles.splice(index, 1);
//   });
var index = animations.indexOf(animation);
if (index > -1) animations.splice(index, 1);
};


let particleAction = (enemy) => {
  for (let i = 0; i < 15; i++) {
    let particle = new Particle(
      enemy.x,
      enemy.y,
      anime.random(14, 30),
      randomParticleColor(particleColors)
    );
    particles.push(particle);
  }
  let particlesAnimation = anime({
    targets: particles,
    x: function (particle) {
      return particle.x + anime.random(particle.radius, -particle.radius);
    },
    y: function (particle) {
      return (
        particle.y +
        anime.random(particle.radius * 1.15, -particle.radius * 1.15)
      );
    },
    r: 0,
    easing: "easeOutExpo",
    duration: anime.random(500, 800),
    complete: removeParticle
  });

  animations.push(particlesAnimation);
  console.log(animations);
};

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
