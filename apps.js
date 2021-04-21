const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const startBtn = document.querySelector('button')

const width = 9
const cells = [] //cells is an array of divs!
let spaceShip = 76 //player starting postion
let laser = ''
let playerScore = 0
let playerLife = 3

//add divs to cells array via the the DOM
for (let i = 0; i < (width) ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}
// add player postion at start of game
cells[spaceShip].classList.add('spaceShip')

//array of invaders
let invaders = [1,2,3,4,5,6,7,10,11,12,13,14,15,16]

//function to loop through invaders array and add spaceInvader class to the divs within the cells array
function addInvaders() {
  invaders.forEach(invader => cells[invader].classList.add('spaceInvader'))
}
//function to loop through invaders array and remove spaceInvader class from the divs within the cells array
function removeInvaders() {
  invaders.forEach(invader => cells[invader].classList.remove('spaceInvader'))
}
//function to loop through invaders array and move spaceInvader one div to the right
function moveInvaders() {
  invaders = invaders.map(invader => invader + 1)
}
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
        console.log(randomBomb)
        if (randomBomb > 71) {
          cells[randomBomb].classList.remove('bomb')
          clearInterval(bombInterval)
        }
        if (cells[randomBomb] === cells[spaceShip]) {
          playerLife = playerLife - 1
          console.log(playerLife)
        }

        if (playerLife === 0) {
          console.log('GAMEOVER')
        }
      },500)
      // stop bombs from moving past last row (cell72)
    }
  },1000) 
}


//add invaders to grid
addInvaders()
dropBomb()

// calling all invader functions within setInterval to move them all accross the cells array one div at a time
setInterval(() => {
  removeInvaders()
  moveInvaders()
  addInvaders()

},1000)

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

      //stop laser from continuing up the grid       
      clearInterval(intervalID)     
      playerScore = playerScore + 10
      scoreDisplay.innerHTML = (`Player Score: ${playerScore}`)
    }, 200)
  }
})