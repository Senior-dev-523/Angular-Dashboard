import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-grid-item.dialog',
  templateUrl: 'delete-grid-item.dialog.html',
  styleUrls: ['delete-grid-item.dialog.css'],
})
export class DeleteGridItemDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit() { }

  onSubmit(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}