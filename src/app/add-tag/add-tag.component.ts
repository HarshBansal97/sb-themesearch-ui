import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent{

  constructor(
    public dialogRef: MatDialogRef<AddTagComponent>
  ) {}

  add(): void {
    this.dialogRef.close('RESULT FROM ADD TAG!');
  }

}
