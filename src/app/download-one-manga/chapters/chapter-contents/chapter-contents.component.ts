import { Component, Input, OnInit } from '@angular/core';
import { UrlOneChapterAngular } from 'src/app/_models/models';

@Component({
  selector: 'app-chapter-contents',
  templateUrl: './chapter-contents.component.html',
  styleUrls: ['./chapter-contents.component.scss']
})
export class ChapterContentsComponent implements OnInit {

  @Input() chapter!: UrlOneChapterAngular;

  constructor() { }

  ngOnInit(): void {
  }

}
