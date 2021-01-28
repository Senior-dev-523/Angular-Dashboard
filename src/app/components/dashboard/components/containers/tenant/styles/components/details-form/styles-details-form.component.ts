import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';
import { Style } from '../../modules/style.module';
import { defaultData } from '../../utils/styles.data';
import { FileSelectDialog } from '../file-select-dialog/file-select.dialog';

@Component({
  selector: 'app-styles-details-form',
  templateUrl: './styles-details-form.component.html',
  styleUrls: ['./styles-details-form.component.css'],
})
export class StylesDetailsFormComponent extends AbstractDestroyable implements OnInit {
  @Output() setOtherData = new EventEmitter<any>();
  formGroup: FormGroup;
  stylesData: Style;
  
  types = [
    {
      label: 'Tenant',
      value: 1
    },
    {
      label: 'test',
      value: 2
    },
  ];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router) {
      super();
     }

  ngOnInit(): void {
    /* get stylesData */
    this.stylesData = defaultData;
    this.initForm();
  }

  onSubmit(): void {
    this.setOtherData.emit({data: {}})
  }
  
  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      logoURL: new FormControl(this.stylesData.logoURL),
      backgroundURL: new FormControl(this.stylesData.backgroundURL)
    });
  }

  returnToParentURL(): void {
    this.router.navigate(['/tenant/styles']);
  }
  
  uploadBackground(): void {
    this.openEditDialog(this.stylesData.backgroundURL)
    .afterClosed()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((fileName: string) => {
      if (fileName) {
        this.formGroup.get('backgroundURL').setValue(fileName);
       }
       /* fileName */
    });
  }

  uploadLogo(): void {
    this.openEditDialog(this.stylesData.logoURL)
    .afterClosed()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((fileName: string) => {
      if (fileName) {
        this.formGroup.get('logoURL').setValue(fileName);
       }
       /* fileName */
    });
  }

  openEditDialog(url: string): MatDialogRef<FileSelectDialog> {
    return this.dialog.open(FileSelectDialog, {
      width: '500px',
      height: '420px',
      panelClass: 'dialog-container',
      data: {
        imageURL: url
      }
    });
  }

  get logoURL() {
    return this.formGroup.get('logoURL').value;
  }

  get backgroundURL() {
    return this.formGroup.get('backgroundURL').value;
  }

}
