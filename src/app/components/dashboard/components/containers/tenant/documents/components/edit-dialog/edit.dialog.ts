import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Documents } from '../../modules/documents.module';
import { DocumentService } from '../../serivce/document.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: Documents = this.data.formData as Documents;
  savedFormData;
  fileData = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private documentService: DocumentService
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
      amount: new FormControl(this.formData.amount),
      attached: new FormControl(this.formData.attached),
      invoiceNumber: new FormControl(this.formData.invoiceNumber),
      invoiceDate: new FormControl(this.formData.invoiceDate),
      expiryDate: new FormControl(this.formData.expiryDate),
      paid: new FormControl(this.formData.paid),
    });
  }

  loagActivityById(): void {

  } 

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): Documents {
    return {
      id: this.formData.id,
      amount: this.formData.amount,
      attached: this.formData.attached,
      invoiceNumber: this.formData.invoiceNumber,
      invoiceDate: this.formData.invoiceDate,
      expiryDate: this.formData.expiryDate,
      paid: this.formData.paid
    }
  }

  async uploadCategoryAndClose(formData: Documents) {
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
  
  createItem(formData: Documents): Observable<Documents> {
    return this.documentService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: Documents): Observable<Documents> {
    return this.documentService.update(formData)
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

  get name() {
    return this.formGroup.get('name').value;
  }

  get state() {
    return this.formGroup.get('state').value;
  }

  get description() {
    return this.formGroup.get('description').value;
  }

}
