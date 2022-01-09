import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronCommuniquateService {

  private _ipc: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  getInfoManga(url: string) {
    if (this._ipc) {
      this._ipc.send('startCheck', {url: url})
      this._ipc.on('startCheckResponse', (event, arg) => {
        console.log(arg) // prints "pong"
      })
    }
  }
}
