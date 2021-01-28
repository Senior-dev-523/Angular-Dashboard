import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/components/dashboard/services/clients.service';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.css'],
})
export class TenantFormComponent implements OnInit {
  @Output() setTanatData = new EventEmitter<any>();

  tenantForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    // console.log(this.tenantForm.value);
    var tenantData = {
      name : this.tenantForm.value.tenantName,
      urlWebApp : this.tenantForm.value.subdomain,
      activationDate : this.tenantForm.value.date,
      active : this.tenantForm.value.active,
      tenantDemo : this.tenantForm.value.tenantDemo,
      userCreationLimit : 1,
      metadata : '',
      currency : 0,
      channel: 0,
      webSite: "",
      facebookPage : "",
      instagramPage : "",
      tripadvisor : ""
    }
    
    this.clientService.createClient(tenantData)
      .subscribe( data => { 
        console.log("result", data);
    });
    this.setTanatData.emit({data: {}});
  }
  
  private initForm(): void {
    this.tenantForm = this.formBuilder.group({
      tenantName: [null, Validators.required],
      subdomain: [null, Validators.required],
      date: [null],
      active: [true],
      tenantDemo: [false]
    });
  }

  get tenantName(): string {
    return this.tenantForm.get('tenantName').value;
  }

  returnToParentURL(): void {
    this.router.navigate(['/tenant/clients']);
  }

}
