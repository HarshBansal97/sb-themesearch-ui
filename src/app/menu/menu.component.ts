import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DbService } from '../db.service';
import { Globals, Tag } from '../globals';
import { TextSelectEvent } from "../text-select.directive";

export interface PurportSection {
  start_idx: number;
  end_idx: number;
  tags: Tag[];
}

interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  hostRectangle: SelectionRectangle | null;

  selectedText: string = '';

  staticText: string = "The topics discussed by Dhṛtarāṣṭra\n" +
    "and Sañjaya, as described in the Mahābhārata,\n" +
    "form the basic principle for this great philosophy."
  errortext: string = '';
  verseSelectionForm: FormGroup;
  verseForm: FormGroup;
  // cantos = new Array(12);
  // chapters = new Array(90);
  // verses = new Array(100);
  translationTagsSelect = new FormControl();
  purportSectionTagsSelect = [];
  translationTags: Tag[] = [];
  purportSections: PurportSection[] = [];
  fetchedVerse = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private db: DbService,
    public gb: Globals,
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

    this.hostRectangle = null;
    this.selectedText = "";

    this.getTagsForTable();
    this.onSubmitVerse();
  }

  get vf() { return this.verseForm.controls; }

  getTagsForTable() {
    let tagsData = this.gb.getTagsFromDB();
    this.gb.parseTags(tagsData);
  }
  onSubmitVerse() {
    this.fetchedVerse = false;
    this.translationTags = [];
    this.purportSections = [];
    this.purportSectionTagsSelect = [];
    this.translationTagsSelect.setValue('');
    this.errortext = '';
    this.verseForm.reset();
    console.log(this.verseSelectionForm.value);
    this.db.getVerse(this.verseSelectionForm.value).subscribe(r => {
      console.log(r);
      if (r.status_code === 200 && r.message === "Successfully fetched verses") {
        console.log(r.payload.length)
        if (r.payload.length !== 0) {
          let verseInfo = r.payload[0];
          this.verseForm.controls['verseText'].setValue(verseInfo['devanagari'] + '\n\n' + verseInfo['verse'] + '\n\n' + verseInfo['synonyms']);
          this.verseForm.controls['translationText'].setValue(verseInfo['translation']);
          this.verseForm.controls['purportText'].setValue(verseInfo['purport']);
          document.getElementById("vData").innerText = verseInfo['devanagari'] + '\n\n' + verseInfo['verse'] + '\n\n' + verseInfo['synonyms'];
          document.getElementById("tData").innerText = verseInfo['translation'];
          document.getElementById("pData").innerText = verseInfo['purport'];
                    this.fetchedVerse = true;
          
          // GET TAGS
          this.getTranslationTags();
          this.getPurportSectionTags();
        } else {
          this.errortext = JSON.stringify('ERROR: unable to fetch the verse');
        }
      } else {
        this.errortext = JSON.stringify('ERROR: unable to fetch the verse');
      }
    }, (error) => {
      console.log(error);
      this.errortext = JSON.stringify(error);
    })
  }

  getTranslationTags() {
    this.translationTags = [];
    console.log("GET TRANSLATION TAGS CALLED")
    this.db.getTranslationTags(this.verseSelectionForm.value).subscribe(r => {
      console.log(r);
      if (r.status_code === 200 && r.message === "Successfully fetched translation tags") {
        for (var tag of r.payload) {
          this.translationTags.push({ 'tag': tag['tag'], 'subCategory': '', 'category': '', 'disabled': false });
        }
        console.log(JSON.stringify(this.translationTags));
        // GET PURPORT TAGS
      }
    }, (error) => {
      console.log(error);
    })
  }

  getPurportSectionTags() {
    console.log("GET PURPORT SECTION TAGS CALLED")
    this.db.getPurportSectionTags(this.verseSelectionForm.value).subscribe(r => {
      console.log(r);
      if (r.status_code === 200 && r.message === "Successfully fetched purport tags") {
        for (var pst of r.payload) {
          if (this.purportSections.length !== 0) {
            var lastPurportSection = this.purportSections[this.purportSections.length - 1];
            if (lastPurportSection['start_idx'] === pst['start_idx'] && lastPurportSection['end_idx'] === pst['end_idx']) {
              lastPurportSection['tags'].push({ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'disabled': false });
            } else {
              console.log("NEW PURPORT SECTION FOUND");
              this.purportSections.push({ 'start_idx': pst['start_idx'], 'end_idx': pst['end_idx'], 'tags': [{ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'disabled': false }] });
            }
          } else {
            console.log("NEW PURPORT SECTION FOUND");
            this.purportSections.push({ 'start_idx': pst['start_idx'], 'end_idx': pst['end_idx'], 'tags': [{ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'disabled': false }] });
          }
        }
        console.log(JSON.stringify(this.purportSections));
      }
    }, (error) => {
      console.log(error);
    })
  }
  // onSubmitVerseText() {
  //   let data = {
  //     "verse_id": this.verseSelectionForm.controls['canto'].value+'.'+this.verseSelectionForm.controls['chapter'].value+'.'+this.verseSelectionForm.controls['verse'].value,
  //     "verse": this.verseForm.controls['verseText'].value,
  //     "translation": this.verseForm.controls['translationText'].value,
  //     "purport": this.verseForm.controls['purportText'].value
  //   }
  //   console.log("data for create verse, ", data);
  //   this.db.createVerse(data).subscribe(r => {
  //     console.log(r);
  //   }, (error) => {
  //     console.log(error);
  //   })
  // }

  addTag(identifier, index): void {

    const dialogRef = this.dialog.open(AddTagComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result,', result);
      if (result) {
        if (identifier === 'translation') {
          this.translationTags = this.translationTags.concat(result);
        } else if (identifier === 'purportSection') {
          if (parseInt(index) !== -1) {
            this.purportSections[parseInt(index)]['tags'] = this.purportSections[parseInt(index)]['tags'].concat(result);
            console.log('ADD TAG: PURPORT ', this.purportSections);
          } else {
            console.log('ADD TAG: WRONG INDEX PASSED FOR PURPORT SECTION');
          }
        }
      }

    });
  }

  removeTag(identifier, index, index2): void {

    if (identifier === 'translation') {
      //console.log('Removing tags ', this.translationTagsSelect.value)
      //if (this.translationTagsSelect.value.length === 0) return;
      //var tag, tagsArray = this.translationTags.slice();
      //for (tag of tagsArray) {
        //if (this.translationTagsSelect.value.includes(tag['tag'])) {
          //console.log("removing a value");
          //var tagIndex = this.translationTags.indexOf(tag);
      this.translationTags.splice(index2, 1);
        //}
      //}
      //this.translationTagsSelect.setValue('');
    } else if (identifier === 'purportSection') {
      //console.log('Removing tags: ', this.purportSectionTagsSelect[parseInt(index)].toString());
      if (this.purportSectionTagsSelect[parseInt(index)].length === 0) return;
      //var tagsArray: any[] = (this.purportSections[parseInt(index)]['tags']).slice();
      //console.log('Removing tags: CURRENT TAGS PURPORT SECTION', JSON.stringify(tagsArray));
      //for (var tag of tagsArray) {
        //if (this.purportSectionTagsSelect[parseInt(index)].includes(tag['tag'])) {
          //console.log("removing a value");
          //var tagIndex = parseInt(this.purportSections[parseInt(index)]['tags'].indexOf(tag));
          this.purportSections[parseInt(index)]['tags'].splice(index2, 1);
        //}
      //}
      //this.purportSectionTagsSelect[parseInt(index)] = [];
    }
  }

  removeSection(index: number) {
    console.log('REMOVE PURPORT SECTION ', index, 'from ', this.purportSections);
    this.purportSections.splice(index, 1);
    this.purportSectionTagsSelect.pop();
    for (var i = 0; i < this.purportSectionTagsSelect.length; i++) {
      this.purportSectionTagsSelect[i] = [];
    }
    console.log('REMOVED PURPORT SECTION ', this.purportSections);
  }

  renderRectangles(event: TextSelectEvent): void {

    console.group("Text Select Event");
    console.log("Text:", event.text);
    console.log("Viewport Rectangle:", event.viewportRectangle);
    console.log("Host Rectangle:", event.hostRectangle);
    console.groupEnd();

    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {

      this.hostRectangle = event.hostRectangle;
      this.selectedText = event.text;

    } else {

      this.hostRectangle = null;
      this.selectedText = "";

    }

  }

  addPurportSection(): void {

    console.group("Shared Text");
    console.log(this.selectedText);
    console.groupEnd();

    this.selectedText = window.getSelection().toString();
    var newSection = {
      'start_idx': this.verseForm.controls['purportText'].value.search(this.selectedText),
      'end_idx': this.verseForm.controls['purportText'].value.search(this.selectedText) + this.selectedText.length - 1,
      'tags': []
    }
    // are indexes valid?
    if (newSection['start_idx'] >= 0 && newSection['end_idx'] <= this.verseForm.controls['purportText'].value.length - 1) {
      console.log('NEW SECTION ', newSection);
      this.purportSectionTagsSelect.push([]);
      for (var i = 0; i < this.purportSectionTagsSelect.length; i++) {
        this.purportSectionTagsSelect[i] = [];
      }
      this.purportSections.push(newSection);
      this.purportSections.sort(function (a, b) { return a['start_idx'] === b['start_idx'] ? a['end_idx'] - b['end_idx'] : a['start_idx'] - b['start_idx'] });
      console.log('SORTED PURPORT SECTIONS ', this.purportSections);
      var indexNewSection = this.purportSections.lastIndexOf(newSection);
      if (this.checkNoExactOverlap(indexNewSection)) {
        this.addTag('purportSection', indexNewSection);
      } else {
        this.purportSections.splice(indexNewSection, 1);
        this.purportSectionTagsSelect.pop();
        for (var i = 0; i < this.purportSectionTagsSelect.length; i++) {
          this.purportSectionTagsSelect[i] = [];
        }
        console.log('DUPLICATE PURPORT SECTION FOUND! ', this.purportSections);
      }
    }
    // Now that we've shared the text, let's clear the current selection.
    document.getSelection().removeAllRanges();
    // CAUTION: In modern browsers, the above call triggers a "selectionchange"
    // event, which implicitly calls our renderRectangles() callback. However,
    // in IE, the above call doesn't appear to trigger the "selectionchange"
    // event. As such, we need to remove the host rectangle explicitly.
    this.hostRectangle = null;
    this.selectedText = "";

  }

  addSection() {
    if (this.verseForm.controls['purportText'].value.length === 0) return;
    console.log(window.getSelection());
    console.log('ANCHOR NODE ', window.getSelection().anchorNode.textContent);
    console.log('FOCUS NODE ', window.getSelection().focusNode.textContent);
    // is it in purport node
    if (window.getSelection().anchorNode.textContent === window.getSelection().focusNode.textContent && window.getSelection().anchorNode.textContent === 'PURPORT') {
      this.selectedText = window.getSelection().toString();
      console.log(this.selectedText);
      var newSection = {
        'start_idx': this.verseForm.controls['purportText'].value.search(this.selectedText),
        'end_idx': this.verseForm.controls['purportText'].value.search(this.selectedText) + this.selectedText.length - 1,
        'tags': []
      }
      // are indexes valid?
      if (newSection['start_idx'] >= 0 && newSection['end_idx'] <= this.verseForm.controls['purportText'].value.length - 1) {
        console.log('NEW SECTION ', newSection);
        this.purportSectionTagsSelect.push([]);
        for (var i = 0; i < this.purportSectionTagsSelect.length; i++) {
          this.purportSectionTagsSelect[i] = [];
        }
        this.purportSections.push(newSection);
        this.purportSections.sort(function (a, b) { return a['start_idx'] === b['start_idx'] ? a['end_idx'] - b['end_idx'] : a['start_idx'] - b['start_idx'] });
        console.log('SORTED PURPORT SECTIONS ', this.purportSections);
        var indexNewSection = this.purportSections.lastIndexOf(newSection);
        if (this.checkNoExactOverlap(indexNewSection)) {
          this.addTag('purportSection', indexNewSection);
        } else {
          this.purportSections.splice(indexNewSection, 1);
          this.purportSectionTagsSelect.pop();
          for (var i = 0; i < this.purportSectionTagsSelect.length; i++) {
            this.purportSectionTagsSelect[i] = [];
          }
          console.log('DUPLICATE PURPORT SECTION FOUND! ', this.purportSections);
        }
      }


    }

    //console.log("Selected Substring starts at index:", this.staticText.search(this.selectedText)," and ends at index:", this.staticText.search(this.selectedText)+this.selectedText.length-1)
  }

  checkNoExactOverlap(index) {
    console.log("OVERLAP: CHECKING INDEX ", index);
    if (index === 0 && this.purportSections.length === 1) {
      console.log("OVERLAP: FIRST ELEMENT IN THE ARRAY!")
      return true;
    }
    if (index !== this.purportSections.length - 1) {
      if (this.purportSections[index]['start_idx'] === this.purportSections[index + 1]['start_idx']) {
        if (this.purportSections[index]['end_idx'] === this.purportSections[index + 1]['end_idx']) {
          return false;
        } else {
          console.log("OVERLAP: +1 END INDEX DON'T MATCH!")
        }
      } else {
        console.log("OVERLAP: +1 START INDEX DON'T MATCH!")
      }
    }
    if (index !== 0) {
      if (this.purportSections[index]['start_idx'] === this.purportSections[index - 1]['start_idx']) {
        if (this.purportSections[index]['end_idx'] === this.purportSections[index - 1]['end_idx']) {
          return false;
        } else {
          console.log("OVERLAP: -1 END INDEX DON'T MATCH!")
          return true;
        }
      } else {
        console.log("OVERLAP: -1 START INDEX DON'T MATCH!")
        return true;
      }
    }
    return true;

  }

  getPurportSectionText(index) {
    return this.verseForm.controls['purportText'].value.slice(this.purportSections[index]['start_idx'], this.purportSections[index]['end_idx'] + 1);
  }

  onSubmitChanges() {
    var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
    var translationtags = [];
    for (var tag of this.translationTags) {
      translationtags.push({ 'tag': tag['tag'] });
    }
    var translationTagsData = {
      "verse_id": verse_id,
      "translationtags": translationtags
    }
    console.log('SUBMITTING TRANSLATION TAGS ', translationTagsData);

    this.db.postTranslationTags(translationTagsData).subscribe(r => {
      console.log(r);
    }, (error) => {
      console.log(error);
    })


    var purportsectiontags = [];
    for (var ps of this.purportSections) {
      for (var tag of ps['tags']) {
        purportsectiontags.push({ 'start_idx': ps['start_idx'], 'end_idx': ps['end_idx'], 'tag': tag['tag'] });
      }
    }
    var purportsectionTagsData = {
      "verse_id": verse_id,
      "purporttags": purportsectiontags
    }
    console.log('SUBMITTING PURPORT SECTION TAGS ', purportsectionTagsData);
    this.db.postPurportSectionTags(purportsectionTagsData).subscribe(r => {
      console.log(r);
    }, (error) => {
      console.log(error);
    })

  }

}