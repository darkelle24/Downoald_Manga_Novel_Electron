import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChaptersComponent implements OnInit {

  @Input() chapters: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
