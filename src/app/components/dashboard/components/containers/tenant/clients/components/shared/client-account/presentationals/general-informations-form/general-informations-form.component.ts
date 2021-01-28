import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-informations-form',
  templateUrl: './general-informations-form.component.html',
  styleUrls: ['./general-informations-form.component.css'],
})
export class GeneralInformationsFormComponent implements OnInit {
  @Output() setGeneralData = new EventEmitter<any>();

  generalForm: FormGroup;
  typologies = [
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
    console.log(this.generalForm.value)
    // var generalInfo = {
    //   businessName : this.generalForm.value.businessName,

    // }
    this.setGeneralData.emit({data: {}});
  }
  
  private initForm(): void {
    this.generalForm = this.formBuilder.group({
      businessName: [null, Validators.required],
      address: [null, Validators.required],
      city: [null],
      zipCode: [null],
      province: [null],
      region: [null],
      nation: [null],
      vatCode: [null],
      fiscalCode: [null],
      pec: [null],
      recipientCode: [null]
    });
  }

  returnToParentURL(): void {
    this.router.navigate(['/tenant/clients']);
  }
}
