const back = require('../back/back.ts')
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadURL('http://localhost:4200')
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  back.startBack()
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

try {
  require('electron-reloader')(module)
} catch (_) {}
