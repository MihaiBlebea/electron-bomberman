const { ipcRenderer } = require('electron')
const Board = require('./src/Board')
const BrickWall = require('./src/BrickWall')
const ConcreteWall = require('./src/ConcreteWall')

const myNotification = new Notification('Title', {
    body: 'Notification from the Renderer process'
})

myNotification.onclick = ()=> {
    console.log('Notification clicked')
}

// Trigger alert
const alertOnlineStatus = ()=> { window.alert(navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()

ipcRenderer.on('ping', (event, message) => {
    console.log(message) // Prints 'whoooooooh!'
})

let board = new Board(21)

board.genLevel()
// Put bricks inside it
// for (let i = 0; i < 10; i++) {
//     board.addEntity(new ConcreteWall(), i + 2,  i + 2)
// }

board.render(document.getElementById('frame'))

