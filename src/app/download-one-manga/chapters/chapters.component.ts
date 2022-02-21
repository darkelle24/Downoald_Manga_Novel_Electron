import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UrlOneChapter } from 'models/siteModels';
import { StatusEnum, UrlOneChapterAngular } from 'src/app/_models/models';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChaptersComponent implements OnInit {

  @Input() chapters!: UrlOneChapterAngular[];

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
