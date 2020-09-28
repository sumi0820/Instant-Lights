const canvas = document.querySelector("#splash");
const ctx = canvas.getContext("2d");
const canvasG = document.querySelector("#main");
const ctxG = canvasG.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
canvasG.width = innerWidth;
canvasG.height = innerHeight;

//====ELEMENTS====//
const colors = [
  "#2185C5",
  "#7ECEFD",
  "#ffd571",
  "#FF7F66",
  "#D2E603",
  "#5D54A4",
  "#C3AED6",
  "#FF9A76",
];
const particleColors = [
  "rgba(33,133,197,0.7)",
  "rgba(126, 206, 253,0.7)",
  "rgba(255, 213, 113,0.7)",
  "rgba(255,127,102,0.7)",
  "rgba(210,230,3,0.7)",
  "rgba(93,84,164,0.7)",
  "rgba(195,174,214,0.7)",
  "rgba(255,154,118,0.7)",
];

const randomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomParticleColor = () => {
  return particleColors[Math.floor(Math.random() * particleColors.length)];
};

const title = () => {
  const FONT_NAME = "Oswald-Regular";
  function renderText() {
    ctx.font = `48px "${FONT_NAME}"`;
    ctx.fillStyle = "#f6f6f6";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Instant Lights", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = `16px "${FONT_NAME}"`;
    ctx.fillStyle = "#f6f6f6";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "Press WASD to move. Point and click to shoot.",
      canvas.width / 2,
      canvas.height / 2 + 30
    );
  }
  document.fonts.load('10pt "Oswald-Regular"').then(renderText);
};

let splashScreenMusic = new Audio();
splashScreenMusic.src = "../audio/Kosu - Unminus.com.mp3";
// let particleSoundEffect = new Audio();
// particleSoundEffect.src = "../audio/blast.mp3"

// const explosion = () => {
//   particleSoundEffect.play();
//   particleSoundEffect.volume = 0.2
//   setTimeout(() => {
//     particleSoundEffect.pause()
//   }, 1500);
// }

//====INSTANCE CREATION====//
// PLAYER //

const playerX = canvasG.width / 2;
const playerY = canvasG.height / 2;
const playerRadius = 10;
let score = 0;

const player = new Player(playerX, playerY, playerRadius, "#f6f6f6", score);

const beam = new Beam(canvasG.width / 2, canvasG.height / 2, 2, "red", 1);
let beams = [];

// ENEMY //
let enemies = [];
const spawnEnemies = () => {
  setInterval(() => {
    const enemyRadius = randomNum(30, 10);
    let enemyX;
    let enemyY;
    if (randomNum(1, 0) < 0.5) {
      enemyX =
        randomNum(1, 0) < 0.5 ? 0 - enemyRadius : canvasG.width + enemyRadius;
      enemyY = randomNum(canvasG.height, -1);
    } else {
      enemyX = randomNum(canvasG.width, -1);
      enemyY =
        randomNum(1, 0) < 0.5 ? 0 - enemyRadius : canvasG.height + enemyRadius;
    }

    const enemyColor = randomColor(colors);

    // Get angle(radian) of the point where the user click
    const angle = Math.atan2(
      canvasG.height / 2 - enemyY,
      canvasG.width / 2 - enemyX
    );

    // Get velocity based on the angle
    const enemyVelocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(
      new Enemy(enemyX, enemyY, enemyRadius, enemyColor, enemyVelocity)
    );
  }, 1000);
};

//====FUNCTIONS====//

// ANIMATION //
let animationId;
const animateGame = () => {
  animationId = requestAnimationFrame(animateGame);
  ctxG.clearRect(0, 0, canvasG.width, canvasG.height);

  player.draw();

  beams.forEach((beam, beamsIndex) => {
    beam.update();

    // Clear beams once it goes outside of canvas
    if (
      beam.x - beam.radius < 0 ||
      beam.x - beam.radius > canvasG.width ||
      beam.y - beam.radius < 0 ||
      beam.y - beam.radius > canvasG.hight
    ) {
      setTimeout(() => {
        beams.splice(beamsIndex, 1);
      }, 0);
    }
  });

  const clearCanvas = () => {
    ctxG.clearRect(0, 0, canvasG.width, canvasG.height);
  };

  // Collision detection
  enemies.forEach((enemy, enemiesIndex) => {
    enemy.update();

    // Player vs Enemy
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius < 1 || player.timer === 10) {
      animations = [];
      cancelAnimationFrame(animationId);
      player.stopChangeBackground();
      TweenMax.to("#main", 2, { backgroundColor: "#f6f6f6" });
      TweenMax.delayedCall(0.01, clearCanvas);
      TweenMax.delayedCall(2, gameEndAnimation);

      console.log("game end");
    }

    // Enemy vs Beam
    beams.forEach((beam, beamsIndex) => {
      const dist = Math.hypot(beam.x - enemy.x, beam.y - enemy.y);
      const removeEnemy = () => {
        enemies.splice(enemiesIndex, 1);
      };
      const removeBeam = () => {
        beams.splice(beamsIndex, 1);
      };

      if (dist - enemy.radius - beam.radius < 1) {
        if (enemy.radius > 15) {
          gsap.to(enemy, {
            radius: enemy.radius - 5,
          });
          setTimeout(() => {
            removeBeam();
            player.score++;
          }, 0);
        }
        // else if (enemy.radius > 15 && enemy.radius < 19) {
        //   gsap.to(enemy, {
        //     radius: enemy.radius - 5,
        //   });
        //   setTimeout(() => {
        //     removeBeam();
        //     player.score = player.score + 10;
        //   }, 0);
        // } 
        else {
          setTimeout(() => {
            particleEvent(enemy);
            removeBeam();
            removeEnemy();
            player.score = player.score + 10;

          }, 0);
        }
      }
    });
  });
};

// EVENT HANDLER //

canvasG.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  if (!player.overKill) {
    setTimeout(() => {
      enemies.forEach((enemy) => {
        particleEvent(enemy);
      });
      enemies = [];
    }, 0);
    player.overKill = true;
  }
});

canvasG.addEventListener("click", (event) => {
  // Get angle(radian) of the point where the user click
  const angle = Math.atan2(
    event.clientY - canvasG.height / 2,
    event.clientX - canvasG.width / 2
  );

  // Get velocity based on the angle
  const beamVelocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  // Draw beam to the position where the user click
  beams.push(
    new Beam(canvasG.width / 2, canvasG.height / 2, 2, "#f6f6f6", beamVelocity)
  );
});
