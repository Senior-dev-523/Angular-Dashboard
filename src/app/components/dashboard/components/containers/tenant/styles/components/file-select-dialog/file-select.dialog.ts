import { Component, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractDestroyable } from 'src/app/utils/abstract-destroyable';

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: 'file-select.dialog.html',
  styleUrls: ['file-select.dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectDialog extends AbstractDestroyable {
  imageURL = null;
  selectedImageURL = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FileSelectDialog>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit() {
    this.initializeFormGroup();
  }

  initializeFormGroup(): void {
    this.imageURL = this.data.imageURL;
  }

  loagActivityById(): void {

  }

  onSubmit(): void {
    this.dialogRef.close(this.selectedImageURL);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onFileChanges(fileName: string): void {
    this.selectedImageURL = fileName;
  }
}
