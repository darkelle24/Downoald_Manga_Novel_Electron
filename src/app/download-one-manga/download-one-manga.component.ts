import { ModeEnum } from 'src/app/_helper/modeEnum';
import { ElectronCommuniquateService } from './../_helper/electron-communiquate.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-download-one-manga',
  templateUrl: './download-one-manga.component.html',
  styleUrls: ['./download-one-manga.component.scss']
})
export class DownloadOneMangaComponent implements OnInit, OnDestroy {

  parametersOpen: boolean = false
  supportedSiteOpen: boolean = false
  infoManga: boolean = false
  sub: Subscription;

  constructor(public electron: ElectronCommuniquateService) {
    this.sub = this.electron._mode.asObservable().subscribe({
      next: (value: ModeEnum) => {
        if (value === ModeEnum.READYTODOWNLOAD) {
          this.openInfoManga()
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
  }

  openParameter() {
    this.parametersOpen = !this.parametersOpen
    if (this.supportedSiteOpen)
      this.supportedSiteOpen = false
    if (this.infoManga)
      this.infoManga = false
  }

  openSupportedSite() {
    this.supportedSiteOpen = !this.supportedSiteOpen
    if (this.parametersOpen)
      this.parametersOpen = false
    if (this.infoManga)
      this.infoManga = false
  }

  openInfoManga() {
    this.infoManga = !this.infoManga
    if (this.parametersOpen)
      this.parametersOpen = false
    if (this.supportedSiteOpen)
      this.supportedSiteOpen = false
  }
}
