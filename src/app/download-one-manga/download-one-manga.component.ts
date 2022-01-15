import { ElectronCommuniquateService } from './../_helper/electron-communiquate.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-download-one-manga',
  templateUrl: './download-one-manga.component.html',
  styleUrls: ['./download-one-manga.component.scss']
})
export class DownloadOneMangaComponent implements OnInit {

  parametersOpen: boolean = false
  supportedSiteOpen: boolean = false

  constructor(private electron: ElectronCommuniquateService) { }

  ngOnInit(): void {
  }

  openParameter() {
    this.parametersOpen = !this.parametersOpen
  }

  openSupportedSite() {
    this.supportedSiteOpen = !this.supportedSiteOpen
  }
}
