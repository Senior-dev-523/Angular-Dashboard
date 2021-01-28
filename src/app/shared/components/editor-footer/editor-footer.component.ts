import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

const ICON_PATH = './assets/icons/';

@Component({
  selector: 'app-editor-footer',
  templateUrl: './editor-footer.component.html',
  styleUrls: ['./editor-footer.component.css']
})
export class EditorFooterComponent implements OnInit {
  @Output() onCreateEvent = new EventEmitter<boolean>();
  @Output() onCloseEvent = new EventEmitter<boolean>();
  @Input() isDisabled: boolean;
  
  constructor() { }

  ngOnInit(): void { }

  onCreate(): void {
    this.onCreateEvent.emit();
  }

  onClose(): void {
    this.onCloseEvent.emit();
  }

  getBaseTabIconPath(name: string): string {
    return `${ ICON_PATH }${name}`;
  }

}