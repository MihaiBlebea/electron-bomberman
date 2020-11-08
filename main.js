const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const Board = require('./src/Board')

let board = new Board(20)

function createWindow () {

    const win = new BrowserWindow({
        width: board.getBoardSize() * board.getBoxSize(),
        height: board.getBoardSize() * board.getBoxSize() + 25, // I think this is because of the top frame
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()

    // Show progress bar
    win.setProgressBar(0.9)

    // Handle key press event
    win.webContents.on('before-input-event', (event, input) => {
        console.log(input.key)
        // if (input.control && input.key.toLowerCase() === 'i') {
        //     console.log('Pressed Control+I')
        //     event.preventDefault()
        // }

        win.webContents.send('ping', input.key);
    })
}

// Add docker menu and trigger actions
const dockMenu = Menu.buildFromTemplate([
    {
        label: 'Bomberman',
        click () { console.log('New Window') }
    }, {
        label: 'New Window with Settings',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    },
    { label: 'New Command...' }
])

app.whenReady().then(()=> {
    createWindow()

    // trigger menu
    app.dock.setMenu(dockMenu)
}).catch((e)=> {
    console.log(e)
})

// Handle window closing
app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Handle the start of the application
app.on('activate', ()=> {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('online-status-changed', (event, status) => {
    console.log(status)
})
