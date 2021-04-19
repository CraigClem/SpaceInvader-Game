const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const startBtn = document.querySelector('button')

const width = 9
const cells = []
const InavaderArray = []
let spaceShip = 76
let spaceInvader = 0
let laser = ''
let playerScore = 0
const playerLife = 3

function startGame() {

  startBtn.addEventListener('click', () => {
    const intervalId3 = setInterval(() => {
      console.log('Start Game')
      //count down from three
      //game code to be added in here.
      clearInterval(intervalId3)
    },1000)

  })
}

for (let i = 0; i < (width) ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}

//add invaders to the grid
function addInvader() {
  //iterate through cells 1 - 7
  for (let i = 1; i < width - 1; i++) {
    //add class spaceInvader class to cells
    cells[i].classList.add('spaceInvader')
    console.log(i)
  }
}


addInvader()

cells[spaceShip].classList.add('spaceShip')

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
      if (cells[spaceInvader] === (cells[laser])) {
        cells[spaceInvader].classList.remove('spaceInvader')
        cells[laser].classList.remove('laser')
        cells[spaceInvader].classList.add('explosion')
        //stop laser from continuing up the grid       
        clearInterval(intervalID)
        //add 10pts to player score when invader hit.        
        playerScore = playerScore + 10
        scoreDisplay.innerHTML = (`Player Score: ${playerScore}`)
        //need to remove invader once 'hit' 
      }
      console.log(laser)
    }, 200)
  }
})

// one hard coded invader movement from left to right only
const IntervalID2 = setInterval(() => {


  cells[spaceInvader].classList.remove('spaceInvader')
  spaceInvader++
  cells[spaceInvader].classList.add('spaceInvader')
  // game over when invader reaches last row
  if (spaceInvader === 72) {
    clearInterval(IntervalID2)
    cells[spaceInvader].classList.remove('spaceInvader')
    alert('Game Over!')
  }


}, 1000)

// invaders drop bombs on player

// function bomb() {
//   if (cells.classList.contains('spaceInvader')) {
    
//   }
// }

// console.log(bomb())


// reset game function 
// function resetGame() {
//   lives = 3
//   score = 0
//   spaceShip = 76
//   intervalId = 0
//   spaceInavder = []
//   cells[spaceInvader].classList.remove('spaceInvader')
//   alert(`Final score ${playerScore}`)
// }