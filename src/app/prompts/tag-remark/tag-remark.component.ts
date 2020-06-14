import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-remark',
  templateUrl: './tag-remark.component.html',
  styleUrls: ['./tag-remark.component.css']
})
export class TagRemarkComponent {

  oldRemark: string = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TagRemarkComponent>
  ) { 

    this.oldRemark = this.data.remark;

    dialogRef.disableClose = true;
    /*
      Subscribe to events emitted when the backdrop is clicked
      NOTE: Since we won't actually be using the `MouseEvent` event, we'll just use an underscore here
      See https://stackoverflow.com/a/41086381 for more info
    */
    dialogRef.backdropClick().subscribe(() => {
      // Close the dialog
      dialogRef.close(this.oldRemark);
    })
    
  }

  @HostListener('window:keyup.esc') onkeyup() {
    this.dialogRef.close(this.oldRemark);
  }
  
  onNoClick(): void {
    this.dialogRef.close(this.oldRemark);
  }

  okClick(): void {
    this.dialogRef.close(this.data.remark);
  }


}
