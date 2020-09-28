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
    //   animations.forEach((elem,index) => {
    //     animations.splice(index, 1);
    //   });
    //   particles.forEach((elem,index) => {
    //     particles.splice(index, 1);
    //   });
    var index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
  };

function particleEvent(enemy) {
  let particles = [];

    for (let i = 0; i < 15; i++) {
      let particle = new Particle(
        enemy.x,
        enemy.y,
        anime.random(20, 40),
        randomParticleColor(particleColors)
      );
      particles.push(particle);
    }

      let particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return particle.x + anime.random(particle.radius+10, -particle.radius-10);
      },
      y: function (particle) {
        return (
          particle.y +
          anime.random(particle.radius * 1.15+10, -particle.radius * 1.15 +10)
        );
      },
      radius: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeParticle,
    });

    animations.push(particlesAnimation);
    animatePart();
  };

//   function extend(a, b){
//     for(var key in b) {
//       if(b.hasOwnProperty(key)) {
//         a[key] = b[key];
//       }
//     }
//     return a;
//   }
  
//   var ParticleC = function(opts) {
//     extend(this, opts);
//   }

//   Particle.prototype.draw = function() {
//     ctx.globalAlpha = this.opacity || 1;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
//     if (this.stroke) {
//       ctx.strokeStyle = this.stroke.color;
//       ctx.lineWidth = this.stroke.width;
//       ctx.stroke();
//     }
//     if (this.fill) {
//       ctx.fillStyle = this.fill;
//       ctx.fill();
//     }
//     ctx.closePath();
//     ctx.globalAlpha = 1;
//   }


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
