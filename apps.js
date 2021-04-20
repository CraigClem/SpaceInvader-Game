const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const startBtn = document.querySelector('button')

const width = 9
const cells = [] //cells is an array of divs!
let spaceShip = 76 //player starting postion
let laser = ''
let playerScore = 0
const hitInvaders = []

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
  if (invaders === cells[72]){
    console.log('Game Over')
  }
}
//function to generate invader bombs at random postions, dropped every 1sec if cells conatins the invader class
function dropBomb() {
  setInterval(() => {
    const randomInvader = Math.floor(Math.random() * cells.length)
    if (cells[randomInvader].classList.contains('spaceInvader')) {
      cells[randomInvader].classList.add('bomb')
    }
  },1000)
}

//function to filter invader from invaders array and return a new invaders when cell index is not equal to laser index
// function hitInvader() {
//   const filteredInvaders = invaders.filter((invaders) => {
//     return invaders !== cells[laser] //retun if condition true
//   })
//   return filteredInvaders
  
// } 
// hitInvader()


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
      console.log(hitIndex) 
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


