const gameEndAnimation = () => {
  const scoreScreen = document.querySelector("#score");
  scoreScreen.classList.add("gameEnd");
  const bg = document.createElement("div");

  bg.classList.add("bg");

  bg.innerHTML = `
    <div class="score__text">
        <h1>${player.score}</h1>
        <p>points</p>
    </div>
    <div> <button type="button" class="btn btn-info restart">Restart</button></div>
    `;
  scoreScreen.appendChild(bg);
  tl.from(".gameEnd", 1.4, { autoAlpha: 0, y: 100 });

  const btn = document.querySelector(".restart");
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    restartAction(scoreScreen, bg);
  });
};
