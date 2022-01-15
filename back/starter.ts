import { BrowserWindow } from "electron";
import { join } from "path";
import SiteManga from "../models/siteModels";
import { startBack } from "./src/back";
import { loadAllSite } from "./src/loadSite";

export abstract class Main {
  mainWindow: Electron.BrowserWindow | null = null;
  application: Electron.App;
  abstract siteFolderPath: string
  listSite: SiteManga[] = []

  constructor(app: Electron.App) {
    this.application = app;
  }

  async start() {
    this.siteFolderPath = join(__dirname, this.siteFolderPath)
    this.listSite = await loadAllSite(this.siteFolderPath)
    console.log(this.listSite.length)
    this.application.on('window-all-closed', () => { this.onWindowAllClosed() });
    this.application.on('ready', () => { this.onReady() });
    this.application.on('activate', () => { if (this.mainWindow === null) { this.onReady() }})
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      this.application.quit();
    }
  }

  private onClose() {
    // Dereference the window object.
    this.mainWindow = null;
  }

  private onReady() {
    this.mainWindow = new BrowserWindow({ width: 800, height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    if (this.mainWindow) {
      this.loadApp()
      this.mainWindow.on('closed', () => { this.onClose() });
      console.log('Start Electron')
      this.mainWindow.webContents.once('did-finish-load', () => {
        if (this.mainWindow) {
          startBack(this.mainWindow, this.listSite)
        }
      })
    }
  }

  abstract loadApp(): void
}
