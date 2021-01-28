import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css'],
})
export class DetailsFormComponent implements OnInit {
  @Output() setOtherData = new EventEmitter<any>();
  otherForm: FormGroup;
  
  roles = [
    {
      label: 'Admin',
      value: 1
    },
    {
      label: 'Test',
      value: 2
    },
  ];

  types = [
    {
      label: 'Ristorante',
      value: 1
    },
    {
      label: 'Pizzeria',
      value: 2
    },
    {
      label: 'Ristorante - Pizzeria',
      value: 3
    },
    {
      label: 'Non definito....',
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
