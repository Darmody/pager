const electron = require('electron')

const BrowserWindow = electron.BrowserWindow
const app = electron.app

function createWindow() {
  const win = new BrowserWindow({
    width: 800, height: 600
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)
