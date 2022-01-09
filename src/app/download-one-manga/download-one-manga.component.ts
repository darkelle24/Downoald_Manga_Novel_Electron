import { ElectronCommuniquateService } from './../_helper/electron-communiquate.service';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-download-one-manga',
  templateUrl: './download-one-manga.component.html',
  styleUrls: ['./download-one-manga.component.scss']
})
export class DownloadOneMangaComponent implements OnInit {

  url = ''

  parametersOpen: boolean = false

  folderName: string = ''
  files: any = undefined

  constructor(private electron: ElectronCommuniquateService) { }

  ngOnInit(): void {
  }

  checkUrlInput(input: NgModel): boolean {
    if (input.invalid && (input.dirty || input.touched) && input.errors?.['pattern']) {
      return true
    }
    return false
  }

  openParameter() {
    this.parametersOpen = !this.parametersOpen
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length !== 0) {
      this.files = event.target.files
      this.getFolderName()
    }
  }

  getFolderName() {
    if (this.files) {
      for (var i = 0; i < this.files.length; ++i) {
        if (!(this.files[i].webkitRelativePath.split('\\').length > 2)) {
          let splited = this.files[i].path.split('\\')
          splited.pop()
          this.folderName = splited.join('/')
          return
        }
      }
    }
  }

  checkManga() {
    this.electron.getInfoManga(this.url)
  }
}
