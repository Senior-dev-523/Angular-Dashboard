import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-selection-dropdown',
  templateUrl: './filter-selection-dropdown.component.html',
  styleUrls: ['./filter-selection-dropdown.component.css']
})
export class DilterSelectionDropdownComponent implements OnInit {
  @Output() idValueChange = new EventEmitter()
  @Input() displayName: '';
  @Input() items = [];
  @Input() sortPropertyName = 'name';
  @Input() selectedId;

  filtredItems
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.sortСategoriesArray();

    this.filtredItems = this.items;
    this.formGroup = this.fb.group({
      formItems: new FormControl(this.selectedId, [Validators.required]),
    });
  }

  onSearchKeyUp($event): void {
    this.filter($event.target.value);
  }

  sortСategoriesArray(): void {
    if(this.items)
     this.items.sort(function (a, b) {
       let titleA = a['name'].toLowerCase(), titleB = b['name'].toLowerCase()
       if (titleA < titleB)
         return -1
       if (titleA > titleB)
         return 1
       return 0
     });
  }

  selectItem(id: number) {
    this.idValueChange.emit(id)
  }

  onClose() {
    this.filter('');
  }

  filter(searchTest: string): void {
     this.filtredItems = this.items.filter(item => item[this.sortPropertyName].toLowerCase().includes(searchTest.toLowerCase()));
  }

}