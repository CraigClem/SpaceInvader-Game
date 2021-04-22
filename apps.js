const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const lifeDisplay = document.querySelector('.life')
const gameoverDisplay = document.querySelector('.gameover')
const startBtn = document.querySelector('.start-game')
const restartBtn = document.querySelector('.restart')
const audioPlayer = document.querySelector('audio')

const width = 9
const cells = [] //cells is an array of divs!
let spaceShip = 76 //player starting postion
let laser = ''
let playerScore = 0
let playerLife = 3
let direction = 1


startBtn.addEventListener('click',() => {
  playGame()
  playerLife = 3
  lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
  gameoverDisplay.innerHTML = ('')
})

function playGame() {

  startBtn.addEventListener('click',() => {
    gameOver()
    playerLife = 3
    lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
    gameoverDisplay.innerHTML = ('')
  })

  //add divs to cells array via the the DOM
  for (let i = 0; i < (width) ** 2; i++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    cells.push(div)
    div.innerHTML = i 
  
  }
  // add player postion at start of game
  cells[spaceShip].classList.add('spaceShip')

  //array of invaders
  let invaders = [1,2,3,4,5,6,7,10,11,12,13,14,15,16]

  //function to loop through invaders array and add spaceInvader class to the divs within the cells array
  function addInvaders() {
    invaders.forEach(invader => cells[invader].classList.add('spaceInvader'))
    if (invaders.length === 0){
      newLevel()
    }
  }
  //function to loop through invaders array and remove spaceInvader class from the divs within the cells array
  function removeInvaders() {
    invaders.forEach(invader => cells[invader].classList.remove('spaceInvader'))
  }
  //function to loop through invaders array and move spaceInvader one div to the right
  function moveInvaders() {

    const vaderRightWall =  invaders.some((invader) => {
      return invader % width === width - 1
    })
    const vaderLeftWall =  invaders.some((invader) => {
      return invader % width === 0
    })
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
      gameoverDisplay.innerHTML = ('GAME OVER')
      gameOver()
    }
  }

  addInvaders()
  dropBomb()
  // calling all invader functions within setInterval to move them all accross the cells array one div at a time
  const invaderInterval = setInterval(() => {

    removeInvaders()
    moveInvaders()
    addInvaders()

  },1000)

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
            gameoverDisplay.innerHTML = ('GAME OVER')
          }
        },300)
      }
    },500) 
  }

  // Player Movement + player fire laser
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
    if (key === ' ') {
      audioPlayer.src = 'sounds/shoot.wav'
      audioPlayer.play()
      laser = spaceShip - width
      cells[laser].classList.add('laser')
    

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

  function reset() {
    clearInterval(invaderInterval)
    gameOver()
    gameoverDisplay.innerHTML = ('')
    playerScore = 0
    scoreDisplay.innerHTML = (`PLAYER SCORE: ${playerScore}`)
    playerLife = 3
    lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
    cells[spaceShip].classList.remove('spaceShip')
    spaceShip = 76
    removeInvaders()
    invaders = [1,2,3,4,5,6,7,10,11,12,13,14,15,16]
    removeInvaders()
    moveInvaders()
    addInvaders()
    // cells[spaceShip].classList.add('spaceShip')
  
  }

  function newLevel() {

    lifeDisplay.innerHTML = (`LIVES: ${playerLife}`)
    cells[spaceShip].classList.remove('spaceShip')
    spaceShip = 76
    removeInvaders()
    invaders = [1,2,3,4,5,6,7,10,11,12,13,14,15,16,19,20,21,22,23,24,25]
    removeInvaders()
    moveInvaders()
    addInvaders()
    cells[spaceShip].classList.add('spaceShip')
    if (playerLife === 0){
      gameoverDisplay.innerHTML = ('GAME OVER')
      reset()
      gameoverDisplay.innerHTML = ('')
    }
  }

  function gameOver() {
    removeInvaders()
    cells[spaceShip].classList.remove('spaceShip')
    clearInterval(invaderInterval)
  }

}
