const grid = document.querySelector('.grid')
let playerScore = document.querySelector('.playerScore')

const width = 9
const cells = []
let spaceShip = 76
let laser = ''
const spaceInvader = 31
const playerLife = 0



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

    const intervalID = setInterval(() => {

      laser = spaceShip -= width
      cells[laser].classList.add('laser')
      cells[laser].classList.remove('laser')
      laser -= width
      cells[laser].classList.add('laser')


      if (cells[spaceInvader] === (cells[laser])) {
        cells[spaceInvader].classList.remove('spaceInvader')
        cells[laser].classList.remove('laser')
        cells[spaceInvader].classList.add('explosion')
        playerScore += 10
        playerScore.innerHTML = (playerScore)
        clearInterval(intervalID)
      } else if (laser < width)
        
        clearInterval(intervalID)
      
    
      console.log(laser)
    }, 200)
  }
})


// setInterval(() => {


//   cells[spaceInvader].classList.remove('spaceInvader')
//   spaceInvader ++
//   cells[spaceInvader].classList.add('spaceInvader')



// }, 1000)






