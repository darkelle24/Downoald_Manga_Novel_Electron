import { ipcMain } from "electron";
import { SiteManga } from "../../models/siteModels"
import puppeteer from 'puppeteer-core'
import { consoleLog } from "../func/consoleLog";

function check(url: string, sites: SiteManga[]): SiteManga | false {
  for (const site of sites) {
    for (const domaine of site.domaine) {
      if (url.startsWith(domaine)) {
        return site
      }
    }
  }
  return false
}

export function getInfoManga(win: Electron.BrowserWindow, browser: puppeteer.Browser, sites: SiteManga[]) {
  ipcMain.on('startCheck', async (event, arg: any) => {
    const url = arg.url
    const site = check(url, sites)

    if (site !== false) {
      const page = await browser.newPage()
      //page.on('console', (msg) => consoleLog(win, 'PAGE LOG: ' + msg.text()));
      await page.goto(url)

      await Promise.all([
        Promise.resolve(site.getInfoManga(page)).then((value: any) => {
          win.webContents.send('infoManga', value)
        }),
        Promise.resolve(site.getAllUrlSingleChapter(page)).then((value: any) => {
          win.webContents.send('infoChapter', value)
        })
      ])
    }
  })
}
