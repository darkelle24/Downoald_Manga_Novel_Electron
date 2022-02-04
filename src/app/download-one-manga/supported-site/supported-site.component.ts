import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElectronCommuniquateService } from 'src/app/_helper/electron-communiquate.service';

@Component({
  selector: 'app-supported-site',
  templateUrl: './supported-site.component.html',
  styleUrls: ['./supported-site.component.scss']
})
export class SupportedSiteComponent implements OnInit {

  @Output() supportedSiteOpenEvent = new EventEmitter<void>();

  constructor(public electron: ElectronCommuniquateService) { }

  ngOnInit(): void {
  }

  openSupportedSite() {
    console.log(this.electron.supportedSites)
    this.supportedSiteOpenEvent.emit()
  }

}
