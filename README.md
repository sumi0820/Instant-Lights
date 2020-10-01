# Instant Lights

## Description

Instant Lights is a simple shooting game.

## MVP (DOM - CANVAS)

MVP definition, deliverables.

- Player targets and shoots the enemies by clicking the mouse.
- The enemies appear from different angles outside of the screen.
- Once Player's beam hits the enemy, enemy is gone from the screen.
- If Player touches the enemy, game is over.
- Display the score
- Player also moves by keys and dodge the enemies.

## Backlog

- Animation(Splash, collision, background color)
- Increase difficulty every 10 seconds
- BGM/SE

## Data structure

### splashMain.js

- animateSplash(){}
- loop(){}

### splashObject.js

- class Ball
- draw()
- title(){}

### gameMain.js

- animateGame(){}

### gameObject.js

- class Player
- class Beam
- class Enemy

### gameFunction.js

- cleanUpObj(){}
- playerVsEnemy(){}
- enemyVsBeam(){}
- enemyVsShield(){}
- restartAction(){}

### gameEvent.js

- addEventListener("click",(){})
- addEventListener("keydown",(){})
- addEventListener("keyup",(){})
- addEventListener("keydown",(){})
- addEventListener("contextmenu",(){})

### gameEnd.js

- animateGameEnd(){}

### audio.js

- splashMusic(){}
- explosion(){}
- explosion2(){}
- explosion3(){}
- transition(){}
- gameLose(){}
- gameEndMusic(){}

### utils.js

- randomNum(){}
- randomColor(){}
- clearCanvas(){}
- removeObj(){}


## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameEndScreen

## Task
- Build splash
- Build Player
- Build Beam
- Build Enemy
- Create spawnEnemies
- Animate game
- Build gameEnd
- Build DOM
- Add effects(particle, ripple)
- Add audio
- Polish UI

## Links

### Figma - Wireframe

[Link url](https://www.figma.com/file/529k1tASOu7VO1RUfxclgo/M1-Project-Instant-lights?node-id=2%3A3)

### Notion - Idea/Task manager

[Link url](https://www.notion.so/M1-Project-Instant-Lights-da80a43dbe1e416e9e91013187095c60)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/sumi0820/instant-lights)
[Link Deploy](https://sumi0820.github.io/Instant-Lights/)

### Slides

URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1aeFPQgqq2rr4jJnX84WPE8iizxGGMHAolKzK1uwA9Io/edit?usp=sharing)
