//============EVENT HANDLER============//
// Shoot
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

//==================================//
// Move
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

//==================================//
// Shield
window.addEventListener("keyup", (event) => {
  event.preventDefault();
  isRight = false;
  isLeft = false;
  isUp = false;
  isDown = false;
});

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.shiftKey) {
    if (!player.overKill) {
      for (let i = 0; i < 5; i++) {
        rippleEvent(enemies[i]);
      }
      enemies.splice(0, 5);
      explosion2();
      player.score = player.score + 5;
      player.overKill = true;
    }
  }
});

//==================================//
// Special attack
canvasG.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  if (!player.specialEffect) {
    protectPlayer(player);
    explosion3();
    player.shield = true;
    player.specialEffect = true;

    setTimeout(() => {
      player.shield = false;
    }, 300);
  }
});
