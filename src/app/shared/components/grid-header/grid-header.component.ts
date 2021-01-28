import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.css']
})
export class GridHeaderComponent implements OnInit {
  @Output() onCreateEvent = new EventEmitter<boolean>();
  @Input() title: string;
  @Input() showCreateButton: boolean;
  @Input() isDisabled: boolean;
  @Input() iconName: string;

  constructor() { }

  ngOnInit(): void { }

  onCreate(): void {
    this.onCreateEvent.emit();
  }
}
