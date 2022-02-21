import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ModeEnum } from './modeEnum';
import { BehaviorSubject, Observable } from 'rxjs';
import { MangaInfo, SiteManga, UrlOneChapter } from 'models/siteModels';
import { StatusEnum, UrlOneChapterAngular } from '../_models/models';

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

  _supportedSites: SiteManga[] = []
  set supportedSites(sites: SiteManga[]) {
    this.zone.run(() => {
      this._supportedSites = sites
    })
  }
  get supportedSites(): SiteManga[] {
    return this._supportedSites
  }

  _infoManga: MangaInfo = {
    iconUrl: '',
    name: '',
    alternativeName: [],
    status: '',
    genre: [],
    authors: []
  }
  set infoManga(info: MangaInfo) {
    this.zone.run(() => {
      this._infoManga = info
    })
  }
  get infoManga(): MangaInfo {
    return this._infoManga
  }

  _infoChapter: UrlOneChapterAngular[] = []
  set infoChapter(info: UrlOneChapterAngular[]) {
    this.zone.run(() => {
      this._infoChapter = info.map((value: UrlOneChapter) => {
        let toReturn: any = value

        toReturn.pourcentage = 0
        toReturn.status = StatusEnum.NOSTART
        return toReturn
      })
    })
  }
  get infoChapter(): UrlOneChapterAngular[] {
    return this._infoChapter
  }

  private infoSite: any

  constructor(public zone: NgZone) {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;

        this.printBackLog(this._ipc)

        this.loadChrome(this._ipc)

        this.supportedSiteIPC(this._ipc)

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

  protected supportedSiteIPC(ipc: IpcRenderer) {
    ipc.on("supportedSite", (event: any, arg: any) => {
      this.supportedSites = arg.supportedSites
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
      //NORMAL
      this.getInfoManga('https://readmanganato.com/manga-mu989777')
    })
  }

  clearInfoManga() {
    this.infoManga = {
      iconUrl: '',
      name: '',
      alternativeName: [],
      status: '',
      genre: [],
      authors: []
    }
  }

  clearInfoChapter() {
    this.infoChapter = []
  }

  getInfoManga(url: string) {
    if (this._ipc) {

      this._ipc.send('startCheck', { url: url })
      this.mode = ModeEnum.LOADURL
      this.clearInfoManga()
      this.clearInfoChapter()
      let finshManga = false
      let finishChapter = false

      this._ipc.once('infoManga', (_event: any, arg: any) => {
        this.infoManga = arg.infoManga
        this.infoSite = arg.infoSite
        finshManga = true
        if (finishChapter)
          this.mode = ModeEnum.READYTODOWNLOAD
      })

      this._ipc.once('infoChapter', (_event: any, arg: any) => {
        this.infoChapter = arg
        finishChapter = true
        if (finshManga)
          this.mode = ModeEnum.READYTODOWNLOAD
      })

    }
  }

  downloadManga() {
    if (this._ipc) {
      this._ipc.send('download', { list: this._infoChapter, infoSite: this.infoSite })
    }
  }
}
