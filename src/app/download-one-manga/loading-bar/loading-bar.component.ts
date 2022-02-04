import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ElectronCommuniquateService } from 'src/app/_helper/electron-communiquate.service';
import { ModeEnum } from 'src/app/_helper/modeEnum';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  sub: Observable<string>
  pourcentage: number = 0

  constructor(public electron: ElectronCommuniquateService) {
    this.sub = this.electron._mode.asObservable().pipe(map((value: ModeEnum) => {
      let toReturn = ''

      if (value === ModeEnum.LOADCHROME) {
        toReturn = "Loading Chrome / Chromium"
        this.pourcentage = 0

      } else if (value === ModeEnum.ERRORCHROME) {
        toReturn = "Error while loading Chrome / Chromium"
        this.pourcentage = 0

      } else if (value === ModeEnum.WAITURL) {
        toReturn = "Wait for url"
        this.pourcentage = 0

      } else if (value === ModeEnum.LOADURL) {
        toReturn = "Load url"
        this.pourcentage = 0

      } else if (value === ModeEnum.DOWNLOAD) {
        toReturn = "Download"

      } else if (value === ModeEnum.READYTODOWNLOAD) {
        toReturn = "Ready to download manga"
        this.pourcentage = 0

      }
      return toReturn
    }))
  }

  ngOnInit(): void {
  }

}
