let splashBgm = new Audio();
splashBgm.src = "../audio/Chill Trap.mp3"
// "../audio/Reverie.mp3";

const splashMusic = () => {
  splashBgm.play();
  splashBgm.volume = 0.2;
};
//==================================//
let particleSoundEffect = new Audio();
particleSoundEffect.src = "../audio/packun_eating.mp3";

const explosion = () => {
  particleSoundEffect.play();
  particleSoundEffect.volume = 0.2;
  // setTimeout(() => {
  //   particleSoundEffect.pause()
  // }, 1500);
};
//==================================//


let transition = new Audio();
transition.src = "../audio/slow-motion-end1.mp3";

const transitionSe = () => {
  transition.play();
  transition.volume = 0.5;
};

//==================================//


let lose = new Audio();
lose.src = "../audio/buun1.mp3";

let endMusic = new Audio();
endMusic.src = "../audio/gameEnd.mp3";

const gameLose = () => {
    lose.play();
    lose.volume = 0.2;
  };

const gameEndMusic = () => {
  endMusic.play();
  endMusic.volume = 0.2;
};

//==================================//


//==================================//

let mainBgm = new Audio();
mainBgm.src = "../audio/A.m. Lofi.mp3";

const gameMusic = () => {
  mainBgm.play();
  mainBgm.volume = 0.2;
};

const gameMusicStop = () => {
  mainBgm.pause();
  mainBgm.currentTime = 0;
};
