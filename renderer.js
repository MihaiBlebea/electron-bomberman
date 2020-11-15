const { ipcRenderer } = require('electron')
const Board = require('./src/Board')
const BrickWall = require('./src/BrickWall')
const ConcreteWall = require('./src/ConcreteWall')

// const myNotification = new Notification('Title', {
//     body: 'Notification from the Renderer process'
// })

// myNotification.onclick = ()=> {
//     console.log('Notification clicked')
// }

// Trigger alert
// const alertOnlineStatus = ()=> { window.alert(navigator.onLine ? 'online' : 'offline') }

// window.addEventListener('online', alertOnlineStatus)
// window.addEventListener('offline', alertOnlineStatus)

// alertOnlineStatus()

ipcRenderer.on('ping', (event, message) => {
    console.log(message) // Prints 'whoooooooh!'
})



let board = new Board(21)

board.genLevel()

board.createCanvas(document.getElementById('frame'))

document.addEventListener('keydown', (event)=>  {
    // if(event.keyCode == 37) {
    //     alert('Left was pressed');
    // }
    // else if(event.keyCode == 39) {
    //     alert('Right was pressed');
    // }
    switch (event.keyCode) {
        case 37:
            board.move({x: -1, y: 0})
            break
        case 38:
            board.move({x: 0, y: -1})
            break
        case 39:
            board.move({x: 1, y: 0})
            break
        case 40:
            board.move({x: 0, y: 1})
            break
    }
})

board.render()

