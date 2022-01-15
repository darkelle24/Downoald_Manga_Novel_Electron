export function consoleLog(win: Electron.BrowserWindow, message: any) {
  console.log(message)
  win.webContents.send('consoleLog', message)
}
