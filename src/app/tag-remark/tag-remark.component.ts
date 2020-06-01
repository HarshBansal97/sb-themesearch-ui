import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-remark',
  templateUrl: './tag-remark.component.html',
  styleUrls: ['./tag-remark.component.css']
})
export class TagRemarkComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TagRemarkComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    this.dialogRef.close(this.data.remark);
  }


}
