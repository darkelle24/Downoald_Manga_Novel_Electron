import { Image } from './../../models/siteModels';
import { ipcMain } from 'electron'
import { SiteManga, UrlOneChapter } from 'models/siteModels'
import puppeteer from 'puppeteer-core'
import * as fs from "fs";
import { consoleLog } from 'back/func/consoleLog';

function findSite(toFind: string, sites: SiteManga[]): SiteManga | undefined {
  for (const site of sites) {
    if (site.name === toFind) {
      return site
    }
  }
  return undefined
}

async function downloadOneImage(browser: puppeteer.Browser, image: Image, path: string) {
  const page = await browser.newPage()
  const viewSource = await page.goto(image.url)

  await fs.writeFile(path, await viewSource.buffer(), (err) => {
    page.close()
    if (err) {
        throw err
    }
  });
}

export function download(win: Electron.BrowserWindow, browser: puppeteer.Browser, sites: SiteManga[]) {
  ipcMain.on('download', async (event, arg: { list: UrlOneChapter[], infoSite: { name: string } }) => {
    const site = findSite(arg.infoSite.name, sites)

    if (site) {
      await arg.list.forEach(async (element: UrlOneChapter) => {
        const page = await browser.newPage()
        await page.goto(element.url)

        let images = await Promise.resolve(site.getAllImageFromUrl(page))
        page.close()

        //images.map((image: Image) => downloadOneImage(browser, image))

      });
    }
      /* const page = await browser.newPage()
      await page.goto(url)

      await Promise.all([
        Promise.resolve(site.getInfoManga(page)).then((value: any) => {
          win.webContents.send('infoManga', value)
        }),
        Promise.resolve(site.getAllUrlSingleChapter(page)).then((value: any) => {
          win.webContents.send('infoChapter', value)
        })
      ])
      page.close() */
  })
}
