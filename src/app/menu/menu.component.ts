import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DbService } from '../db.service';

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

  verseSelectionForm: FormGroup;
  verseForm: FormGroup;
  cantos = new Array(12);
  chapters = new Array(90);
  verses = new Array(100);

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private db: DbService,
  ) { }

  ngOnInit() {
    this.verseSelectionForm = this.fb.group({
      canto: ['1'],
      chapter: ['1'],
      verse: ['1']
    });

    this.verseForm = this.fb.group({
      verseText: [''],
      translationText: [''],
      purportText: ['']
    });

    this.onSubmitVerse();
  }

  onSubmitVerse() {
    console.log(this.verseSelectionForm.value);
    this.db.getVerse(this.verseSelectionForm.value).subscribe(r => {
      console.log(r);
    }, (error) => {
      console.log(error);
    })
  }
  addTag(): void {

    if (window.getSelection) {
      //console.log(window.getSelection())
      this.selectedText = window.getSelection().toString();
      //console.log("Selected Substring starts at index:", this.staticText.search(this.selectedText)," and ends at index:", this.staticText.search(this.selectedText)+this.selectedText.length-1)

    }

    const dialogRef = this.dialog.open(AddTagComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result,', result);
      this.selectedText = this.selectedText + '\n' + JSON.stringify(result);
    });
  }

}