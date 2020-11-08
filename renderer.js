const { ipcRenderer } = require('electron')

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

let buttonText = ''
ipcRenderer.on('ping', (event, message) => {

    buttonText += message
    document.getElementById('app').innerHTML = buttonText
    console.log(message) // Prints 'whoooooooh!'
})
