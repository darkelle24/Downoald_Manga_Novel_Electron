import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-supported-site',
  templateUrl: './supported-site.component.html',
  styleUrls: ['./supported-site.component.scss']
})
export class SupportedSiteComponent implements OnInit {

  @Output() supportedSiteOpenEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  openSupportedSite() {
    this.supportedSiteOpenEvent.emit()
  }

}
