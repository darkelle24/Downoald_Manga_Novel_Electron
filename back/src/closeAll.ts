import { ipcMain } from 'electron'
import puppeteer from 'puppeteer-core'

export function closeAll(browser: puppeteer.Browser) {
  browser.close()
  ipcMain.removeAllListeners('startCheck')
}
