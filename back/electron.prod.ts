import { app } from 'electron';
import { Main } from './starter';

export class MainProd extends Main {
  siteFolderPath = '../../../../back/site'

  loadApp() {
    if (this.mainWindow)
      this.mainWindow.loadFile('dist/download-manga-electron/index.html');
  }

}

new MainProd(app).start();

