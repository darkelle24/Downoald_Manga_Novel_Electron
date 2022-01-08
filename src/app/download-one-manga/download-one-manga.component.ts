import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-download-one-manga',
  templateUrl: './download-one-manga.component.html',
  styleUrls: ['./download-one-manga.component.scss']
})
export class DownloadOneMangaComponent implements OnInit {

  url = ''

  constructor() { }

  ngOnInit(): void {
  }

  checkUrlInput(input: NgModel): boolean {
    if (input.invalid && (input.dirty || input.touched) && input.errors?.['pattern']) {
      return true
    }
    return false
  }

}
