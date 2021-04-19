const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const startBtn = document.querySelector('button')

const width = 9
const cells = []
let spaceShip = 76
const spaceInvader = 0
let laser = ''
let playerScore = 0


for (let i = 0; i < (width) ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}

cells[spaceShip].classList.add('spaceShip')

let invaders = [0,1,2,3,4,5]

function addInvaders() {
  invaders.forEach(invader => cells[invader].classList.add('spaceInvader'))
}

function removeInvaders() {
  invaders.forEach(invader => cells[invader].classList.remove('spaceInvader'))
}

function moveInvaders() {
  invaders = invaders.map(invader => invader + 1) 
}

addInvaders()

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

      if (!hitIndex) return 
      console.log('hit!')

      cells[hitIndex].classList.remove('spaceInvader')
      cells[hitIndex].classList.remove('laser')
      //stop laser from continuing up the grid       
      clearInterval(intervalID)
      //add 10pts to player score when invader hit.        
      playerScore = playerScore + 10
      console.log(playerScore)
      scoreDisplay.innerHTML = (`Player Score: ${playerScore}`)
      //need to remove invader once 'hit' 
    
    }, 200)
  }
})