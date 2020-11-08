const { ipcRenderer } = require('electron')
const Board = require('./src/board')

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

let board = new Board(100)
board.render(document.getElementById('frame'))

// let canvas = document.getElementById('display')
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

// let rectX = 0;
// let rectY = 0;

// function draw(canvas) {
//     // Clear the entire canvas
//     let context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     context.fillStyle = '#ff8080';
//     context.fillRect(rectX, rectY, 150, 100);
// }

// draw(canvas)
