
//============INSTANCE CREATION============//
let ball;
let balls = [];
function init() {
  balls = [];
  for (let i = 0; i < 75; i++) {
    let ballsRadius = randomNum(50, 10);
    let ballsX = randomNum(canvas.width, -1);
    let ballsY = randomNum(canvas.height - ballsRadius, -1);
    let ballsDY = randomNum(2, -2);
    balls.push(new Ball(ballsX, ballsY, ballsDY, ballsRadius, randomColor(colors)));
  }
}

//============ANIMATION============//
let animationSplashId;

function animateSplash() {
  animationSplashId = requestAnimationFrame(animateSplash);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  title();
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(loop);
}

TweenMax.delayedCall(0.5, splashMusic);
init();
animateSplash();

//============EVENT HANDLER============//
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});


canvas.addEventListener("click", () => {

  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animationSplashId);
  }, 2000);

  tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
  tl.to("#splash", { y: "-100%", duration: 1 }, "-=2");

  TweenMax.to("#main", 3, { backgroundColor: "#1A1A2E" });
  splashBgm.pause();
  splashBgm.currentTime = 0;
  transitionSe();

  TweenMax.delayedCall(2, gameMusic);
  TweenMax.delayedCall(1, animateGame);
  TweenMax.delayedCall(1, difficultyHandler);
  TweenMax.delayedCall(1, spawnEnemies);
  player.changeBackground();
  TweenMax.to("#main", 3, { backgroundColor: "#1A1A2E" });

});
