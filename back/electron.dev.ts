import { app } from "electron";
import { join } from "path";
import { Main } from "./starter";

export class MainDev extends Main {
  siteFolderPath = './site'

  loadApp() {
    if (this.mainWindow)
      this.mainWindow.loadURL('http://localhost:4200');
  }
}

new MainDev(app).start();
