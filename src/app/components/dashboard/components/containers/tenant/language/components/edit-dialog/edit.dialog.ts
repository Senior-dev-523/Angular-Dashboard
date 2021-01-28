import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Language } from '../../modules/language.module';
import { LanguageService } from '../../serivce/language.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: Language = this.data.formData as Language;
  savedFormData;
  fileData = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private languageService: LanguageService
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
      language: new FormControl(this.formData.language, [Validators.required]),
      active: new FormControl(this.formData.active),
      default: new FormControl(this.formData.default),
    });
  }

  loagActivityById(): void {

  }

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): Language {
    return {
      id: this.formData.id,
      language: this.language,
      active: this.active,
      default: this.default,
      imageURL: this.formData.imageURL
    }
  }

  async uploadCategoryAndClose(formData: Language) {
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
  
  createItem(formData: Language): Observable<Language> {
    return this.languageService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: Language): Observable<Language> {
    return this.languageService.update(formData)
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

  get language() {
    return this.formGroup.get('language').value;
  }

  get active() {
    return this.formGroup.get('active').value;
  }

  get default() {
    return this.formGroup.get('default').value;
  }

}
