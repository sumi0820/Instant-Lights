let splashBgm = new Audio();
splashBgm.src = "../audio/Chill Trap.mp3";
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
};
//==================================//
let rippleSoundEffect = new Audio();
// rippleSoundEffect.src = "../audio/zapsplat_sound_design_impact_thud_into_whoosh_powerful_002_48744.mp3";
rippleSoundEffect.src =
  "../audio/zapsplat_sound_design_whoosh_fast_powerful_with_jet_like_engine_tail_54863.mp3";

const explosion2 = () => {
  rippleSoundEffect.play();
  rippleSoundEffect.volume = 0.5;
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

