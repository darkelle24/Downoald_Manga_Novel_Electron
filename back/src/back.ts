import { ipcMain } from 'electron'
import puppeteer from 'puppeteer-core'


function consoleLog(win: Electron.BrowserWindow, message: any) {
  console.log(message)
  win.webContents.send('consoleLog', message)
}

export function startBack(win: Electron.BrowserWindow) {

  let exPath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"

  ipcMain.on('startCheck', (event, arg) => {
    consoleLog(win, "ok")


    const vgmUrl = 'https://www.vgmusic.com/music/console/nintendo/nes';

    (async () => {
      consoleLog(win, "start")
      const browser = await puppeteer.launch({executablePath: exPath});
      consoleLog(win, "launch")
      const page = await browser.newPage();
      consoleLog(win, "load new page")

      await page.goto(vgmUrl);

      consoleLog(win, vgmUrl)

      event.reply('startCheckResponse', "ok")
      await browser.close();
    })();

  })
}
