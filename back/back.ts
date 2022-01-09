const { ipcMain } = require('electron')

ipcMain.on('startCheck', (event, arg) => {
  console.log(arg.url)

  event.reply('startCheckResponse', 'pong')
})
