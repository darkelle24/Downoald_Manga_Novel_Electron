import { app } from "electron";
import { options } from "models/optionModels";
import { join } from "path";
import { initOptionsDev } from "./src/initOptions";
import { Main } from "./starter";

export class MainDev extends Main {
  siteFolderPath = './site'
  options: options = initOptionsDev()

  loadApp() {
    if (this.mainWindow)
      this.mainWindow.loadURL('http://localhost:4200');
  }
}

new MainDev(app).start();
