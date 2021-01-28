import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Devices } from '../../modules/device.module';
import { DeviceService } from '../../serivce/device.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: Devices = this.data.formData as Devices;
  savedFormData;
  fileData = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private deviceService: DeviceService
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
      numberOfDevices: new FormControl(this.formData.numberOfDevices),
    });
  }

  loagActivityById(): void {

  }

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): Devices {
    return {
      id: this.formData.id,
      key: this.formData.key,
      serialNumber: this.formData.serialNumber,
      lastLogin: this.formData.lastLogin,
      state: this.formData.state,
      LoggedIn: this.formData.LoggedIn,
      numberOfDevices: this.numberOfDevices
    }
  }

  async uploadCategoryAndClose(formData: Devices) {
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
  
  createItem(formData: Devices): Observable<Devices> {
    return this.deviceService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: Devices): Observable<Devices> {
    return this.deviceService.update(formData)
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

  get numberOfDevices() {
    return this.formGroup.get('numberOfDevices').value;
  }
}
