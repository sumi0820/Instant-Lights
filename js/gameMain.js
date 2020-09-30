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

//====INSTANCE CREATION====//
// PLAYER //

const playerX = canvasG.width / 2;
const playerY = canvasG.height / 2;
const playerRadius = 10;
let score = 0;

const player = new Player(playerX, playerY, playerRadius, "#f6f6f6", score);

// BEAM //
const beam = new Beam(canvasG.width / 2, canvasG.height / 2, 2, "red", 1);
let beams = [];

// ENEMY //
let difficulty = 1;
let end = false;

const difficultyHandler = () => {
  let difficultyCounter = setInterval(() => {
    difficulty++;
    if (end) {
      clearInterval(difficultyCounter);
    }
  }, 10000);
};

let enemies = [];
const spawnEnemies = () => {
  let intervalId = setInterval(() => {
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
    const angle = Math.atan2(player.y - enemyY, player.x - enemyX);

    // Get velocity based on the angle
    const enemyVelocity = {
      x: Math.cos(angle) * difficulty,
      y: Math.sin(angle) * difficulty,
    };

    enemies.push(
      new Enemy(enemyX, enemyY, enemyRadius, enemyColor, enemyVelocity)
    );
    if (end) {
      clearInterval(intervalId);
    }
  }, 700);
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
    if (dist - enemy.radius - player.radius < 1) {
      end = true;
      animations = [];
      gameLose();
      TweenMax.delayedCall(0.5, gameMusicStop);

      TweenMax.fromTo(
        "#main",
        0.05,
        { x: -1 },
        {
          x: 1,
          repeat: 3,
          yoyo: true,
          ease: Sine.easeInOut,
        }
      );

      cancelAnimationFrame(animationId);
      player.stopChangeBackground();
      TweenMax.to("#main", 2, { backgroundColor: "#f6f6f6" });
      TweenMax.delayedCall(5, gameEndMusic());
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
        } else {
          setTimeout(() => {
            particleEvent(enemy);
            explosion();
            removeBeam();
            removeEnemy();
            player.score = player.score + 10;
          }, 0);
        }
      }
    });

    //==============================================//
    // Shield vs Enemy
    if (player.shield) {
      const distEvsS = Math.hypot(player.x - enemy.x, player.y - enemy.y);
      const removeEnemy = () => {
        enemies.splice(enemiesIndex, 1);
      };

      if (distEvsS - enemy.radius - (player.radius + 100) < 1) {
        setTimeout(() => {
          rippleEvent(enemy);
          removeEnemy();
        }, 0);

        console.log("Shield deploy");
      }
    }

    //==============================================//
  });
};

// EVENT HANDLER //

canvasG.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  if (!player.overKill) {
    for (let i = 0; i < 5; i++) {
      rippleEvent(enemies[i]);
    }
    enemies.splice(0, 5);
    explosion2();
    player.score = player.score + 5;
    player.overKill = true;
  }
});

canvasG.addEventListener("click", (event) => {
  // Get angle(radian) of the point where the user click
  const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);

  // Get velocity based on the angle
  const beamVelocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  // Draw beam to the position where the user click
  beams.push(new Beam(player.x, player.y, 2, "#f6f6f6", beamVelocity));
});

let playerXIncrement = 15;
let playerYIncrement = 15;
let isRight = false;
let isLeft = false;
let isUp = false;
let isDown = false;

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key == "d" || event.key == "ArrowRight") {
    isRight = true;
    isLeft = false;
  } else if (event.key == "a" || event.key == "ArrowLeft") {
    isRight = false;
    isLeft = true;
  } else if (event.key == "w" || event.key == "ArrowUp") {
    isUp = true;
    isDown = false;
  } else if (event.key == "s" || event.key == "ArrowDown") {
    isUp = false;
    isDown = true;
  }
  if (isRight && player.x + player.radius < canvasG.width) {
    player.x += playerXIncrement;
  } else if (isLeft && player.x - player.radius > 0) {
    player.x -= playerXIncrement;
  } else if (isUp && player.y - player.radius * 2 > 0) {
    player.y -= playerYIncrement;
  } else if (isDown && player.y + player.radius * 2 < canvasG.height) {
    player.y += playerYIncrement;
  }
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();
  isRight = false;
  isLeft = false;
  isUp = false;
  isDown = false;
});

window.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (event.shiftKey && !player.specialEffect) {
    protectPlayer(player);
    explosion3();
    player.shield = true;
    player.specialEffect = true;
  }

  setTimeout(() => {
    player.shield = false;
  }, 300);

});
