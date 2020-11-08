const { ipcRenderer } = require('electron')
const Board = require('./src/Board')

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

let board = new Board(20)
board.render(document.getElementById('frame'))

