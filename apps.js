const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')

const width = 9
const cells = []
let spaceShip = 76
let laser = ''
let spaceInvader = []
let playerScore = 0
let playerLife = 3





for (let i = 0; i < (width) ** 2; i++) {

  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)

}

cells[spaceShip].classList.add('spaceShip')
cells[spaceInvader].classList.add('spaceInvader')


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

      if (laser < width) {
        cells[laser].classList.remove('laser')
        clearInterval(intervalID)
        return
        
      }

      cells[laser].classList.remove('laser')
      laser = laser - width
      cells[laser].classList.add('laser')

      if (cells[spaceInvader] === (cells[laser])) {
        cells[spaceInvader].classList.remove('spaceInvader')
        cells[laser].classList.remove('laser')
        cells[spaceInvader].classList.add('explosion')
        playerScore = playerScore + 10
        scoreDisplay.innerHTML = (`Player Score: ${playerScore}`)
  
      }
      console.log(laser)
    }, 200)
  }
})
console.log(scoreDisplay.innerHTML)

// const IntervalID2 = setInterval(() => {


//   cells[spaceInvader].classList.remove('spaceInvader')
//   spaceInvader ++
//   cells[spaceInvader].classList.add('spaceInvader')
//   if (spaceInvader === 72) {
//     clearInterval(IntervalID2)
//     cells[spaceInvader].classList.remove('spaceInvader')
//     console.log('Game Over!')
//   }


// }, 1000)






function bomb(arr) {

  const randomNum = Math.floor(Math.random() * (spaceInvader)) 
  const dropbomb = randomNum
  return dropbomb
}

console.log(bomb())