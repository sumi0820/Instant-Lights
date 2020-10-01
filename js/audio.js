let splashBgm = new Audio();
splashBgm.src = "./audio/splash-music.mp3";

const splashMusic = () => {
  splashBgm.play();
  splashBgm.volume = 0.2;
};
//==================================//

let particleSoundEffect = new Audio();
particleSoundEffect.src = "./audio/explosion.mp3";

const explosion = () => {
  particleSoundEffect.play();
  particleSoundEffect.volume = 0.2;
};
//==================================//

let rippleSoundEffect = new Audio();

rippleSoundEffect.src =
  "./audio/explosion2.mp3";

const explosion2 = () => {
  rippleSoundEffect.play();
  rippleSoundEffect.volume = 0.5;
};
//==================================//
let shieldSoundEffect = new Audio();

shieldSoundEffect.src =
  "./audio/explosion3.mp3";

const explosion3 = () => {
  shieldSoundEffect.play();
  shieldSoundEffect.volume = 0.5;
};
//==================================//

let transition = new Audio();
transition.src = "./audio/transition.mp3";

const transition = () => {
  transition.play();
  transition.volume = 0.5;
};

//==================================//

let lose = new Audio();
lose.src = "./audio/lose.mp3";

let endMusic = new Audio();
endMusic.src = "./audio/gameEnd.mp3";

const gameLose = () => {
  lose.play();
  lose.volume = 0.2;
};

const gameEndMusic = () => {
  endMusic.play();
  endMusic.volume = 0.2;
};

//==================================//



let mainBgm = new Audio();
mainBgm.src = "./audio/gameMusic.mp3";

const gameMusic = () => {
  mainBgm.play();
  mainBgm.volume = 0.2;
};

const gameMusicStop = () => {
  mainBgm.pause();
  mainBgm.currentTime = 0;
};

