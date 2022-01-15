import { consoleLog } from '../func/consoleLog'
import { ipcMain } from 'electron'
import puppeteer from 'puppeteer-core'
import findChrome from 'chrome-finder'
import SiteManga from "../../models/siteModels"

async function openChrome(win: Electron.BrowserWindow, event?: Electron.IpcMainEvent, newPath?: string): Promise<puppeteer.Browser | undefined> {
  let chromePath = ''
  let browser: puppeteer.Browser

  win.webContents.send("tryOpenChrome")

  try {
    if (!newPath)
      chromePath = findChrome();
    else
      chromePath = newPath
    browser = await puppeteer.launch({ executablePath: chromePath });
    consoleLog(win, "Start puppeteer")
    if (event)
      event.reply("startChrome")
    else
      win.webContents.send("startChrome")
    return browser
  } catch (e) {
    consoleLog(win, e)
    if (event)
      event.reply("errorFindChrome")
    else
      win.webContents.send("errorFindChrome")
    return undefined
  }
}

export function startBack(win: Electron.BrowserWindow, sites: SiteManga[]) {
  let browser: puppeteer.Browser | undefined = undefined

  consoleLog(win, "Start")

  ipcMain.on('tryToOpenChrome', (event, arg: any[]) => {
    consoleLog(win, "Start Chrome")
    if (browser) {
      browser.close()
      browser = undefined
    }

    win.webContents.send("supportedSite", sites.map((site: SiteManga) => { return { domaine: site.domaine, name: site.name }}))

    if (arg !== undefined && arg.length !== 0 && arg[0] !== '')
      openChrome(win, event, arg[0]).then((result: any) => {
        browser = result
      })
    else {
      openChrome(win, event).then((result: any) => {
        browser = result
      })
    }
  })

  win.webContents.send("start")

  ipcMain.on('startCheck', (event, arg: any[]) => {
  })
}
