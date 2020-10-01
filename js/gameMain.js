//============INSTANCE CREATION============//
// PLAYER //
const playerX = canvasG.width / 2;
const playerY = canvasG.height / 2;
const playerRadius = 10;
let score = 0;
const player = new Player(playerX, playerY, playerRadius, "#f6f6f6", score);

// BEAM //
let beams = [];

// ENEMY //
let difficulty = 1;
let end = false;

const difficultyHandler = () => {
  let difficultyCounter = setInterval(() => {
    difficulty = +2;
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

    const angle = Math.atan2(player.y - enemyY, player.x - enemyX);

    const enemyVelocity = {
      x: Math.cos(angle) * randomNum(difficulty, 1),
      y: Math.sin(angle) * randomNum(difficulty, 1),
    };

    enemies.push(
      new Enemy(enemyX, enemyY, enemyRadius, enemyColor, enemyVelocity)
    );

    if (end) {
      clearInterval(intervalId);
    }
  }, 700);
};

//============FUNCTION============//
// ANIMATION //
let animationId;

const animateGame = () => {
  animationId = requestAnimationFrame(animateGame);
  ctxG.clearRect(0, 0, canvasG.width, canvasG.height);

  player.draw();

  beams.forEach((beam, beamsIndex) => {
    beam.update();

    // Clear beams once it goes out of canvas
    cleanUpObj(beam, beamsIndex, beams);
  });

  // Collision detection
  enemies.forEach((enemy, enemiesIndex) => {
    enemy.update();

    // Clean up enemy once it goes out of canvas
    cleanUpObj(enemy, enemiesIndex, enemies);

    // Player vs Enemy
    playerVsEnemy(enemy);

    // Enemy vs Beam
    enemyVsBeam(enemy, enemiesIndex);

    // Shield vs Enemy
    enemyVsShield(enemy, enemiesIndex);
  });
};
