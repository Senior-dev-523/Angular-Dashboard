import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { SoftwareModules } from '../../modules/software-modules.module';
import { SoftwareModulesService } from '../../serivce/software-modules.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: SoftwareModules = this.data.formData as SoftwareModules;
  savedFormData;
  fileData = null;

  features = new FormControl();
  featuresList: any[] = [
    {
      id: 1,
      value: 'feature 1'
    },
    {
      id: 2,
      value: 'feature 2'
    },
    {
      id: 3,
      value: 'feature 3'
    },
    {
      id: 4,
      value: 'feature 4'
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private softwareModulesService: SoftwareModulesService
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
      featureIds: new FormControl(this.formData.featureIds)
    });
  }

  loagActivityById(): void {

  }

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): SoftwareModules {
    return {
      id: this.formData.id,
      description: this.formData.description,
      type: this.formData.type,
      value: this.formData.value,
      featureIds: this.formData.featureIds,
    }
  }

  async uploadCategoryAndClose(formData: SoftwareModules) {
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
  
  createItem(formData: SoftwareModules): Observable<SoftwareModules> {
    return this.softwareModulesService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: SoftwareModules): Observable<SoftwareModules> {
    return this.softwareModulesService.update(formData)
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
