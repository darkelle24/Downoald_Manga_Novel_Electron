const { ipcMain } = require('electron')

function startBack() {
  ipcMain.on('startCheck', (event, arg) => {
    console.log(arg.url)
    console.log('ok')

    event.reply('startCheckResponse', 'pong')
  })
}


module.exports.startBack = startBack
