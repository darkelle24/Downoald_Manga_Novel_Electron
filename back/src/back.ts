import { consoleLog } from '../func/consoleLog'
import { ipcMain } from 'electron'
import puppeteer from 'puppeteer-core'
import findChrome from 'chrome-finder'
import { SiteManga } from "../../models/siteModels"
import { getInfoManga } from './getInfoManga'
import { closeAll } from './closeAll'
import { download } from './download'

async function openChrome(win: Electron.BrowserWindow, event?: Electron.IpcMainEvent, newPath?: string): Promise<puppeteer.Browser | undefined> {
  let chromePath = ''
  let browser: puppeteer.Browser

  win.webContents.send("tryOpenChrome")

  try {
    if (!newPath)
      chromePath = findChrome();
    else
      chromePath = newPath
    browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
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

function initAll(win: Electron.BrowserWindow, browser: puppeteer.Browser | undefined, sites: SiteManga[]) {
  if (browser) {
    getInfoManga(win, browser, sites)
    download(win, browser, sites)
  }
}

export function startBack(win: Electron.BrowserWindow, sites: SiteManga[]) {
  let browser: puppeteer.Browser | undefined = undefined

  consoleLog(win, "Start")

  ipcMain.on('tryToOpenChrome', (event, arg: any[]) => {
    consoleLog(win, "Start Chrome")
    if (browser) {
      closeAll(browser)
      browser = undefined
    }

    win.webContents.send("supportedSite", { supportedSites: sites.map((site: SiteManga) => { return { domaine: site.domaine, name: site.name } }) })

    if (arg !== undefined && arg.length !== 0 && arg[0] !== '')
      openChrome(win, event, arg[0]).then((result: any) => {
        browser = result
        initAll(win, browser, sites)
      })
    else {
      openChrome(win, event).then((result: any) => {
        browser = result
        initAll(win, browser, sites)
      })
    }
  })

  win.webContents.send("start")
}
