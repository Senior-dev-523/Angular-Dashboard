import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-form',
  templateUrl: './other-form.component.html',
  styleUrls: ['./other-form.component.css'],
})
export class OtherFormComponent implements OnInit {
  @Output() setOtherData = new EventEmitter<any>();
  otherForm: FormGroup;
  
  channels = [
    {
      label: 'Test',
      value: 1
    },
    {
      label: 'Test 1',
      value: 2
    },
    {
      label: 'Test 3',
      value: 3
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.setOtherData.emit({data: {}})
  }
  
  private initForm(): void {
    this.otherForm = this.formBuilder.group({
    });
  }

  returnToParentURL(): void {
    this.router.navigate(['/tenant/clients']);
  }
}
