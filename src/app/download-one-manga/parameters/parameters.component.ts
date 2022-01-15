import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  @Output() parametersOpenEvent = new EventEmitter<void>();

  folderName: string = ''
  files: any = undefined

  constructor() { }

  ngOnInit(): void {
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

  openParameter() {
    this.parametersOpenEvent.emit()
  }
}
