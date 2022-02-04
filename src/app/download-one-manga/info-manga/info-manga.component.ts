import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ElectronCommuniquateService } from 'src/app/_helper/electron-communiquate.service';

@Component({
  selector: 'app-info-manga',
  templateUrl: './info-manga.component.html',
  styleUrls: ['./info-manga.component.scss']
})
export class InfoMangaComponent implements OnInit {

  @Output() infoManga = new EventEmitter<void>();

  constructor(public electron: ElectronCommuniquateService) { }

  ngOnInit(): void {
  }

  close() {
    this.infoManga.emit()
  }

}
