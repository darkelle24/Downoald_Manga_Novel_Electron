import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronCommuniquateService {

  private ipc!: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  getInfoManga(url: string) {
    this.ipc.send('startCheck', {url: url})
    this.ipc.on('startCheckResponse', (event, arg) => {
      console.log(arg) // prints "pong"
    })
  }
}
