# Space Invaders Game Pj-1

### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive


## Overview
Space Invaders is my first ever front-end development project, produced as part of General Assembly's Immersive Software Engineering Bootcamp. 

My task was to create a grid-based game rendered in the browser that utilised 'vanilla' JavaScript, HTML and CSS.

Given a selection of classic arcade games to choose from, I opted to build  _Space Invaders_ and my intent was to pay homage to the original 1978 Arcade version.

The project was mainly to consolidate my beginners' knowledge of JavaScript and interacting with the DOM, but I worked hard to make it a fun experience to play.

You can play the game [here]('https://craigclem.github.io/SpaceInvader-Game/') 


## The Brief 

- **Render a game in the browser**
- **Design logic for winning & visually display which player won**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)


## The Technologies used 

- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts


## The Approach

### The Grid

The game is built using a grid. A 9 x 9 square is created using JavaScript -  HTML divs are created using a for loop and appended as children of the grid.

 ```js
 
 const width = 9

 for (let i = 0; i < (width) ** 2; i++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    cells.push(div)
  }
 
 ```
 
### Adding the Player to the Grid

The players ship is initially added to the grid by adding a class to cell number 76 on the grid which is the index of the cell array.

### Adding the Space Invaders to the Grid

Space Invaders is an array of grid cells which index corresponds to initial positions where the invader class is added to the cell - the invaders are added using the forEach method. 

```js
let invaders = [1,2,3,4,5,6,7,10,11,12,13,14,15,16]
```
```js 

function addInvaders() {
    invaders.forEach(invader => cells[invader].classList.add('spaceInvader'))
    if (invaders.length === 0){
      newLevel()
    }
  }

  ```

### Space Invader Movement

To move the invaders accross the grid I created 3 funtions to handle each step of movement which are: 

```js 

 removeInvaders()
 moveInvaders()
 addInvaders()

 ```

 removeInvaders uses the forEach method similar to addInvaders however removes the 'spaceInvader' class from the cells on the grid. 

 moveInvaders is a function which defines the parameters of the grid 'walls' and sets the conditions of the movement based on the postion of the invaders within the grid. Using the .some() array method, once an invader has reached the 'edge' of the grid i then used the .map() array method to move the invaders down a row and change the the direction of movement. 


 ```js 
 
 //function to loop through invaders array and move spaceInvader one div to the right
  function moveInvaders() {
    // set parameters for right wall
    const vaderRightWall = invaders.some((invader) => {
      return invader % width === width - 1
    })
    //set parameters for left wall
    const vaderLeftWall =  invaders.some((invader) => {
      return invader % width === 0
    })
    //conditions for movement when invader is at the left
    if (vaderLeftWall && direction === -1) {
      invaders = invaders.map(invader => invader + width) 
      direction = 1
    } else if (vaderRightWall && direction === 1) {
      invaders = invaders.map(invader => invader + width) 
      direction = - 1
    } else if (direction === -1) {
      invaders = invaders.map((invader => {
        return invader - 1
      }))
    } else {
      invaders = invaders.map(invader => invader + 1) 
    } 
    if (invaders.some((invader) => {
      return invader >= 72
    })) {  
      clearInterval(invaderInterval)
      audioPlayer.src = 'sounds/gameover.wav'
      audioPlayer.play()
      gameoverDisplay.innerHTML = ('GAME OVER')
      playerLife = 0
      lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
      gameOver()
    }
  }

  ```

  All three movement fuctions where then called in order within a setInterval of 1000ms

  ```js

   const invaderInterval = setInterval(() => {

    removeInvaders()
    moveInvaders()
    addInvaders()

  },1000)

  ```

  ### Dropping the SpaceInvader bombs

  Invader bombs are dropped at random using the Math.random method however they are only dropped from cells which contain an Invader and this is derived from checking if the random cell contains the SpaceInvader class. 

  For the bomb movement, I used a set Interval to add a class of 'Bomb' to cell below the Invader dropping it (randomBomb + width) and then removed it. 

  If the bomb hit a cell greater than 71 (the index of the cell array) the interval would be cleared and this is the last row of the grid and it would be classed as a miss. 

  If the bomb hit cell containing the 'Spaceship' class, then this would be a 'hit' and the player would loose a life. If the players life === 0, then the gameover function would be called and the game reset. 

  ```js 

  //function to generate invader bombs at random postions, dropped every 1sec if cells conatins the invader class
  function dropBomb() {
    //set interval for new bomb every 1 sec if random cell conatins an invader
    setInterval(() => {
    // random cell
      let randomBomb = Math.floor(Math.random() * cells.length)
      //bombs only dropped from cells with invaders in
      if (cells[randomBomb].classList.contains('spaceInvader')) {
        cells[randomBomb].classList.add('bomb')
        //set interval for bomb movement
        const bombInterval = setInterval(() => {
          cells[randomBomb].classList.remove('bomb')
          randomBomb = randomBomb + width
          cells[randomBomb].classList.add('bomb')
          if (randomBomb > 71) {
            cells[randomBomb].classList.remove('bomb')
            clearInterval(bombInterval)
          }
          if (cells[randomBomb] === cells[spaceShip]) {
            audioPlayer.src = 'sounds/explosion.wav'
            audioPlayer.play()
            playerLife = playerLife - 1
            lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
          }
          if (playerLife === 0) {
  
            gameOver()
            audioPlayer.src = 'sounds/gameover.wav'
            audioPlayer.play()
            gameoverDisplay.innerHTML = ('GAME OVER')
          }
        },300)
      }
    },300) 
  }

  ```

### Laser and Player Movement

For the player movement I used the event listener, keydown and declared the condition for each key in an if statement to determine its actions aswell as preventing movement if the player is at the grids parameters. Eg. If the player is at postion 0 on the grid they cannot move left.
```js

document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === 'f' && !(spaceShip % width === 0) && !(spaceShip < width)) {
      cells[spaceShip].classList.remove('spaceShip')
      spaceShip -= 1
      cells[spaceShip].classList.add('spaceShip')
    }
    if (key === 'j' && !(spaceShip >= 80)) {
      cells[spaceShip].classList.remove('spaceShip')
      spaceShip += 1
      cells[spaceShip].classList.add('spaceShip')
    }
}

```

to fire the laser I also used keydown and set conditions using if statements for a miss and a hit which is nested within a set interval. Similar to the Space Invader bomb dropping, a 'Laser' class is then added and removed at the SpaceShip position minus width.

To check if the laser hit an invader, I used the .find() array method to check if the cell contained both the laser and an an invader. If the cell did contain the invader class I then filtered the invader array and removed the invader which was postioned at collison index and the player recieved 10pts. 

```js 
const intervalID = setInterval(() => {
      // remove laser class once out of playing area 
        if (laser < width) {
          cells[laser].classList.remove('laser')
          clearInterval(intervalID)
          return
        }

        // laser movement up the screen
        cells[laser].classList.remove('laser')
        laser = laser - width
        cells[laser].classList.add('laser')

        //collision of laser and invader
        const hitIndex = invaders.find(invader => invader === laser)
        // if hit index not the same as laser, do nothing.
        if (!hitIndex) return 

        //else....
        invaders = invaders.filter((invader => {
          return invader !== hitIndex
        }))

        cells[hitIndex].classList.remove('spaceInvader')
        cells[hitIndex].classList.remove('laser')
        audioPlayer.src = 'sounds/invaderkilled.wav'
        audioPlayer.play()

        //stop laser from continuing up the grid       
        clearInterval(intervalID)     
        playerScore = playerScore + 10
        scoreDisplay.innerHTML = (`PLAYER SCORE: ${playerScore}`)
      }, 200)
    }
  })

  ```

 

## Challenges
- This was my first front-end JavaScript project and assembling all of my knowledge on arrays, control flow, functions, timeouts and intervals and applying them to an entirely blank canvas for the first time was without doubt the biggest challenge faced. In places, the code is lengthy and a little unwieldy, but I have deliberately left much of it like this as way of referencing my ability and understanding at the time of creation (the project was set with a one-week timeframe). I've progressed a lot since completing this project. 

- Moving the Invaders was the single biggest technical challenge. It took me a little while to understand how to correctly define my left and right walls - and tackling the problem of ships moving into each other was a particularly engaging challenge!



## Victories 


- I'm pleased with the look and feel of the game in terms of its appearance and the sounds and the satisfaction of removing enemy ships. 

- The project really helped to consolidate my knowledge of JavaScript, HTML and CSS and interacting with the DOM. 


## Potential future features

- Although I did include a level 2, i would like to have spent a little more time on this and dynamically increased the number of Invaders and the speed in which the moved. 
 

### [Play the game Now!]()