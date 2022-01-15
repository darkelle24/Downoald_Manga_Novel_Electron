import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ModeEnum } from './modeEnum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronCommuniquateService {

  private _ipc: IpcRenderer | undefined;
  _mode: BehaviorSubject<ModeEnum> = new BehaviorSubject<ModeEnum>(ModeEnum.LOADCHROME)
  set mode(mode: ModeEnum) {
    this.zone.run(() => {
      this._mode.next(mode);
    })
  }
  get mode(): ModeEnum {
    return this._mode.getValue()
  }

  constructor(public zone: NgZone) {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;

        this.printBackLog(this._ipc)

        this.loadChrome(this._ipc)

        this._ipc.send("tryToOpenChrome")

      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  protected printBackLog(ipc: IpcRenderer) {
    ipc.on("consoleLog", (_event: any, arg: string) => {
      console.log("Back: " + arg)
    })
  }

  protected loadChrome(ipc: IpcRenderer) {

    ipc.on("start", (event: any, _arg: any) => {
      console.log("Starts Back")
      ipc.send("tryToOpenChrome")
    })

    ipc.on("tryOpenChrome", () => {
      this.mode = ModeEnum.LOADCHROME
    })

    ipc.on("errorFindChrome", (_event: any, _arg: any) => {
      this.mode = ModeEnum.ERRORCHROME
    })

    ipc.on("startChrome", (_event: any, _arg: any) => {
      console.log("startChrome")
      this.mode = ModeEnum.WAITURL
    })
  }

  getInfoManga(url: string) {
    if (this._ipc) {

      this._ipc.send('startCheck', {url: url})
      this._ipc.once('startCheckResponse', (_event: any, arg: any) => {
        console.log(arg) // prints "pong"
      })

    }
  }
}
