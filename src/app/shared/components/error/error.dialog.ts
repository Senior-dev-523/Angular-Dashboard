import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error.dialog',
  templateUrl: 'error.dialog.html',
  styleUrls: ['error.dialog.css'],
})
export class ErrorDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ErrorDialog>,
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}