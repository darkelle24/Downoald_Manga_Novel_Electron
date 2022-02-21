import { Component, Input, OnInit } from '@angular/core';
import { UrlOneChapterAngular } from 'src/app/_models/models';

@Component({
  selector: 'app-chapter-header',
  templateUrl: './chapter-header.component.html',
  styleUrls: ['./chapter-header.component.scss']
})
export class ChapterHeaderComponent implements OnInit {

  @Input() chapter!: UrlOneChapterAngular;

  constructor() { }

  ngOnInit(): void {
  }

}
