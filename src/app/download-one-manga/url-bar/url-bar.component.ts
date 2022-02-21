import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ElectronCommuniquateService } from 'src/app/_helper/electron-communiquate.service';
import { ModeEnum } from 'src/app/_helper/modeEnum';

@Component({
  selector: 'app-url-bar',
  templateUrl: './url-bar.component.html',
  styleUrls: ['./url-bar.component.scss']
})
export class UrlBarComponent implements OnInit {

  @Output() parametersOpenEvent = new EventEmitter<void>();
  @Output() supportedSiteOpenEvent = new EventEmitter<void>();
  @Output() infoMangaOpenEvent = new EventEmitter<void>();
  url = ''

  constructor(public electron: ElectronCommuniquateService) {
  }

  ngOnInit(): void {
  }

  checkUrlInput(input: NgModel): boolean {
    if (input.invalid && (input.dirty || input.touched) && input.errors?.['pattern']) {
      return true
    }
    return false
  }

  checkUrlValidator(input: NgModel): boolean {
    if (input.invalid && (input.dirty || input.touched) && input.errors?.['URLValidator']) {
      return true
    }
    return false
  }

  checkManga() {
    this.electron.getInfoManga(this.url)
  }

  openParameter() {
    this.parametersOpenEvent.emit()
  }

  openSupportedSite() {
    this.supportedSiteOpenEvent.emit()
  }

  cancelLoad() {
    this.url = ''
    this.electron.mode = ModeEnum.WAITURL
  }

  download() {
    this.electron.downloadManga()
  }

  openInfoManga() {
    this.infoMangaOpenEvent.emit()
  }

}
