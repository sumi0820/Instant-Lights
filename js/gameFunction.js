const cleanUpObj = (obj, objIndex, objArr) => {
  if (
    obj.x < -50 ||
    obj.x > canvasG.width + 50 ||
    obj.y < -50 ||
    obj.y > canvasG.height + 50
  ) {
    setTimeout(() => {
      removeObject(objArr, objIndex);
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

    TweenMax.fromTo(
      "#main",
      0.05,
      { x: -1 },
      {
        x: 1,
        repeat: 10,
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
          removeObject(beams, beamsIndex);
          player.score++;
        }, 0);
      } else {
        setTimeout(() => {
          particleEvent(enemy);
          explosion();
          removeObject(enemies, enemiesIndex);
          removeObject(beams, beamsIndex);
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
        removeObject(enemies, enemiesIndex);
        player.score = player.score + 10;
      }, 0);
    }
  }
};
