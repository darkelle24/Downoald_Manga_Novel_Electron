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

  file: any

  constructor() { }

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
    if (event.target.files && event.target.files.length !== 0)
      this.file = event.target.files
  }

}
