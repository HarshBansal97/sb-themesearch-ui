import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  selectedText: string = '';

  staticText:string = "The topics discussed by Dhṛtarāṣṭra\n"+
  "and Sañjaya, as described in the Mahābhārata,\n"+
  "form the basic principle for this great philosophy."

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }
  addTag(): void {

    if (window.getSelection) {
      //console.log(window.getSelection())
      this.selectedText = window.getSelection().toString();
      console.log("Selected Substring starts at index:", this.staticText.search(this.selectedText)," and ends at index:", this.staticText.search(this.selectedText)+this.selectedText.length-1)

    }

    const dialogRef = this.dialog.open(AddTagComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result,', result);
    });
  }

}