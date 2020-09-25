# Instant Lights

## Description
Instant Lights is a simple shooting game. 


## MVP (DOM - CANVAS)
MVP definition, deliverables.

- Player targets and shoots the enemies by clicking the mouse.
- Player also moves by keys and dodge the enemies.
- The enemies appear from different angles outside of the screen.
- Once Player's beam hits the enemy, enemy is gone from the screen.
- If Player hits the enemy or 60 seconds passes, game is over.
- Display the score

## Backlog
- Animation(Splash, collision, background color)
- Increase difficulty by time
- BGM/SE


## Data structure

### splash.js
- class Ball
- draw()
- drop(){}


### gameMain.js
- animate(){}


### player.js
- class Player
- draw()

### beam.js
- class Beam
- draw()

### enemy.js
- class Enemy
- spawnEnemies(){}
- draw()


### gameEnd.js
- class Score
- draw()


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen



## Task
- Build Player
- Build Beam
- Build Enemy
- Create spawnEnemies
- Build gameEnd
- Build DOM
- Build splash


## Links


### Figma
[Link url](https://www.figma.com/file/529k1tASOu7VO1RUfxclgo/M1-Project-Instant-lights?node-id=2%3A3)

### Trello
[Link url](https://trello.com/b/ilI2Wbmb/m1-project)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/sumi0820/instant-lights)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)