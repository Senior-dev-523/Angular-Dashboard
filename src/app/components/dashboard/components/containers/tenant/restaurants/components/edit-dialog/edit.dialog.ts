import { Component, Inject, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Restaurant } from '../../modules/restaurant.module';
import { RestaurantService } from '../../serivce/restaurant.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialog extends AbstractDestroyable {
  formGroup: FormGroup;
  formData: Restaurant = this.data.formData as Restaurant;
  savedFormData;
  fileData = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private restaurantService: RestaurantService
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
      name: new FormControl(this.formData.name, [Validators.required]),
      description: new FormControl(this.formData.description),
      state: new FormControl(this.formData.state),
    });
  }

  loagActivityById(): void {

  } 

  async onSubmit(): Promise<void> {
    const collectedObject = this.collectObject();
    const resoult = await this.uploadCategoryAndClose(collectedObject);
    this.dialogRef.close(resoult);
  }

  collectObject(): Restaurant {
    return {
      id: this.formData.id,
      name: this.name,
      state: this.state,
      description: this.description
    }
  }

  async uploadCategoryAndClose(formData: Restaurant) {
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
  
  createItem(formData: Restaurant): Observable<Restaurant> {
    return this.restaurantService.create(formData)
      .pipe(take(1));
  }

  updateItem(formData: Restaurant): Observable<Restaurant> {
    return this.restaurantService.update(formData)
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
