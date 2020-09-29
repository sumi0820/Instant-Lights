const gameEndAnimation = () => {
  const scoreScreen = document.querySelector("#score");
  scoreScreen.classList.add("gameEnd");
  const bg = document.createElement("div");

  bg.classList.add("bg");

  bg.innerHTML = `
    <div class="score__text">
        <h1>${player.score}</h1>
        <p>Points</p>
    </div>
    <div> <button type="button" class="btn btn-info restart">Restart</button></div>
    `;
  scoreScreen.appendChild(bg);
  TweenMax.from(".gameEnd", 0.8, { autoAlpha: 0, y: 100 });

  const btn = document.querySelector(".restart");
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    scoreScreen.classList.remove("gameEnd");
    bg.parentNode.removeChild(bg);

    tl.from(".slider", { y: "100%", duration: 1.5, delay: 0.5 });
    tl.from("#main", { y: "100%", duration: 1 }, "-=2");
    tl.to("#main", 0.8, { backgroundColor: "#1A1A2E" });

    player.score = 0;
    player.overKill = false;
    player.x = canvasG.width / 2;
    player.y = canvasG.height / 2;
    difficulty = 1;
    end = false;
    beams = [];
    enemies = [];

    console.log("Score:", player.score);

    endMusic.pause();
    endMusic.currentTime = 0;
    transitionSe();
    TweenMax.delayedCall(2, gameMusic);

    TweenMax.delayedCall(1, animateGame);
    TweenMax.delayedCall(4, spawnEnemies());
    player.changeBackground();
  });
};
