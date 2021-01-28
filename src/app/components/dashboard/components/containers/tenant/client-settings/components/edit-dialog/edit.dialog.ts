import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { ClientSettings } from '../../modules/client-settings.module';
import { ClientSettingsService } from '../../serivce/client-settings.service';
import { welcomePageTypes, currencys } from '../../utils/client-settings.data';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: ClientSettings = this.data.formData as ClientSettings;
  savedFormData;
  fileData = null;
  welcomePageTypes = welcomePageTypes;
  currencys = currencys;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private clientSettingsService: ClientSettingsService
  ) {
    super();
  }

  ngOnInit() {
    this.initializeFormGroup();
    if (this.data.type === 'edit') {
      this.loagActivityById();
      return;
    }
  }

  initializeFormGroup(): void {
    this.formGroup = this.fb.group({
      currencyType: new FormControl(this.formData.currencyType, [Validators.required]),
      welcomePageType: new FormControl(this.formData.welcomePageType)
    });
  }

  loagActivityById(): void {

  }

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): ClientSettings {
    return {
      id: this.formData.id,
      currencyType: this.currencyType,
      welcomePageType: this.welcomePageType,
      name:  this.formData.name,
      phone:  this.formData.phone,
      role:  this.formData.role,
      lastLoginDate:  this.formData.lastLoginDate,
      state:  this.formData.state,
      QRCodeURL: ''
    }
  }

  async uploadCategoryAndClose(formData: ClientSettings) {
    let resoult;
    switch (this.data.type) {
      case 'create':
        resoult = await this.createItem(formData).toPromise();
        break;
      case 'edit':
        resoult = await this.updateItem(formData).toPromise();
        break;
    }
    return resoult;
  }
  
  createItem(formData: ClientSettings): Observable<ClientSettings> {
    return this.clientSettingsService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: ClientSettings): Observable<ClientSettings> {
    return this.clientSettingsService.update(formData)
      .pipe(take(1));
  }

  selectImage(): void {

  }

  onClose(): void {
    this.dialogRef.close(this.savedFormData);
  }

  ngOnDestroy(): void {
    this.dialogRef.close(this.savedFormData);
  }

  get currencyType() {
    return this.formGroup.get('currencyType').value;
  }

  get welcomePageType() {
    return this.formGroup.get('welcomePageType').value;
  }

}
