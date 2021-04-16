const grid = document.querySelector('.grid')

const width = 9
const cells = []
let spaceShip = 76
let laser = 0
let spaceInvader = 0



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
  if (key === 'j') {
    cells[spaceShip].classList.remove('spaceShip')
    spaceShip += 1
    cells[spaceShip].classList.add('spaceShip')
  }
  if (key === ' ') {

    setInterval(() => {

      laser = spaceShip -= width
      cells[laser].classList.add('laser')
      cells[laser].classList.remove('laser')
      laser -= width
      cells[laser].classList.add('laser')
    }, 200)
  }
})




