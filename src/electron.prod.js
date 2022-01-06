
    const {app, BrowserWindow} = require('electron')

    let mainWindow

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        webPreferences: {
          nodeIntegration: true
        }
      })

      mainWindow.setMenuBarVisibility(false)

      mainWindow.loadFile('dist/download-manga-electron/index.html')

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })

