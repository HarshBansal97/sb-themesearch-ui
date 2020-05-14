import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }
  addTag(): void {
    const dialogRef = this.dialog.open(AddTagComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result,', result);
    });
  }

}