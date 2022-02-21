import { app } from 'electron';
import { options } from 'models/optionModels';
import { initOptionsProd } from './src/initOptions';
import { Main } from './starter';

export class MainProd extends Main {
  siteFolderPath = '../../../../back/site'
  options: options = initOptionsProd()

  loadApp() {
    if (this.mainWindow)
      this.mainWindow.loadFile('dist/download-manga-electron/index.html');
  }

}

new MainProd(app).start();

