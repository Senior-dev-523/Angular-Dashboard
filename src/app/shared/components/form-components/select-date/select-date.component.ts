import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {
  @Output() dateChanges = new EventEmitter<any>();
  @Input() initState: string;
  @Input() initText: string;

  selectedState: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeDateFormText();
    this.initializeFormGroup();
  }

  private initializeDateFormText(): void {
    if (this.initState.length) {
      this.selectedState = this.getFormatedDate(this.initState);
      return;
    }
    this.selectedState = this.initText;
  }

  private initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      date: new FormControl(this.initState)
    });
  }

  selectState(event: any): void {
    let date = event.value;
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset*60*1000));

    this.dateChanges.emit(date.toISOString());

    this.selectedState = this.getFormatedDate(date.toISOString());
  }

  private getFormatedDate(date: string): string {
    let formatedDate = date.split('T')[0];
    formatedDate = formatedDate.split('-').join('/');
    return formatedDate;
  }
}
