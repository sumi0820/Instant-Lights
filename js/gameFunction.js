const cleanUpObj = (obj, objIndex, objArr) => {
  if (
    obj.x < -50 ||
    obj.x > canvasG.width + 50 ||
    obj.y < -50 ||
    obj.y > canvasG.height + 50
  ) {
    setTimeout(() => {
      removeObj(objArr, objIndex);
    }, 0);
  }
};

const playerVsEnemy = (enemy) => {
  let distPlayerVsEnemy = dist(player, enemy);

  if (distPlayerVsEnemy - enemy.radius - player.radius < 1) {
    end = true;
    animations = [];
    gameLose();
    TweenMax.delayedCall(0.5, gameMusicStop);

    tl.fromTo(
      "#main",
      0.02,
      { x: -5 },
      {
        x: 5,
        repeat: 10,
        yoyo: true,
        ease: Sine.easeInOut,
      }
    );

    cancelAnimationFrame(animationId);
    player.stopChangeBackground();
    tl.to("#main", 2, { backgroundColor: " #f6f6f6" });
    TweenMax.delayedCall(0.8, gameEndMusic);
    TweenMax.delayedCall(0.01, clearCanvas);
    TweenMax.delayedCall(2, animateGameEnd);

    console.log(`Game Over. Score: ${player.score}`);
  }
};

const enemyVsBeam = (enemy, enemiesIndex) => {
  beams.forEach((beam, beamsIndex) => {
    let distBeamVsEnemy = dist(beam, enemy);

    if (distBeamVsEnemy - enemy.radius - beam.radius < 1) {
      if (enemy.radius > 15) {
        gsap.to(enemy, {
          radius: enemy.radius - 5,
        });
        setTimeout(() => {
          removeObj(beams, beamsIndex);
          player.score++;
        }, 0);
      } else {
        setTimeout(() => {
          particleEvent(enemy);
          explosion();
          removeObj(enemies, enemiesIndex);
          removeObj(beams, beamsIndex);
          player.score = player.score + 10;
        }, 0);
      }
    }
  });
};

const enemyVsShield = (enemy, enemiesIndex) => {
  let distPlayerVsEnemy = dist(player, enemy);
  if (player.shield) {
    if (distPlayerVsEnemy - enemy.radius - (player.radius + 100) < 1) {
      setTimeout(() => {
        rippleEvent(enemy);
        removeObj(enemies, enemiesIndex);
        player.score = player.score + 10;
      }, 0);
    }
  }
};

const restartAction = (scoreScreen, bg) => {
  scoreScreen.classList.remove("gameEnd");
  bg.parentNode.removeChild(bg);


tl.from(".slider", { y: "100%", duration: 1.5, delay: 0.5 });
tl.from("#main", { y: "100%", duration: 1 }, "-=2");
TweenMax.to("#main", 3, { backgroundColor: "#1A1A2E" });


  // Initializing
  player.score = 0;
  player.overKill = false;
  player.specialEffect = false;
  player.x = canvasG.width / 2;
  player.y = canvasG.height / 2;
  difficulty = 1;
  end = false;
  beams = [];
  enemies = [];

  // Restart action
  endMusic.pause();
  endMusic.currentTime = 0;
  transition();
  TweenMax.delayedCall(2, gameMusic);
  TweenMax.delayedCall(1, animateGame);
  TweenMax.delayedCall(2, spawnEnemies);
  player.changeBackground();
};
