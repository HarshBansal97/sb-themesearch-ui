import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';
import { TagRemarkComponent } from '../tag-remark/tag-remark.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DbService } from '../db.service';
import { Globals, Tag } from '../globals';
import { TextSelectEvent } from "../text-select.directive";
import { Router } from '@angular/router';

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
  styleUrls: ['./menu.component.css', './menu.component.less']
})
export class MenuComponent implements OnInit {

  hostRectangle: SelectionRectangle | null;
  selectedText: string = '';
  isLinear;
  firstFormGroup;
  secondFormGroup;
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
  newPurportSection: string;
  isReviewer: boolean = false;

  constructor(
    private route: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private db: DbService,
    public gb: Globals,

  ) {
    this.hostRectangle = null;
    this.selectedText = "";
  }

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
    if (parseInt(sessionStorage.getItem('account_type')) === 3) {
      this.isReviewer = true;
    } else {
      this.isReviewer = false;
    }
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
          this.translationTags.push({ 'tag': tag['tag'], 'subCategory': '', 'category': '', 'tag_id': tag['tag_id'], 'tagger': tag['tagger'], 'reviewer': tag['reviewer'], 'tagger_remark': tag['tagger_remark'], 'disabled': false });
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
              lastPurportSection['tags'].push({ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'tag_id': pst['tag_id'], 'tagger': pst['tagger'], 'reviewer': pst['reviewer'], 'tagger_remark': pst['tagger_remark'], 'disabled': false });
            } else {
              console.log("NEW PURPORT SECTION FOUND");
              this.purportSections.push({ 'start_idx': pst['start_idx'], 'end_idx': pst['end_idx'], 'tags': [{ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'tag_id': pst['tag_id'], 'tagger': pst['tagger'], 'reviewer': pst['reviewer'], 'tagger_remark': pst['tagger_remark'], 'disabled': false }] });
            }
          } else {
            console.log("NEW PURPORT SECTION FOUND");
            this.purportSections.push({ 'start_idx': pst['start_idx'], 'end_idx': pst['end_idx'], 'tags': [{ 'tag': pst['tag'], 'subCategory': '', 'category': '', 'tag_id': pst['tag_id'], 'tagger': pst['tagger'], 'reviewer': pst['reviewer'], 'tagger_remark': pst['tagger_remark'], 'disabled': false }] });
          }
        }
        console.log(JSON.stringify(this.purportSections));
      }
    }, (error) => {
      console.log(error);
    })
  }

  // Any user can add tags for translation, purport section

  addTag(identifier, index): void {

    const dialogRef = this.dialog.open(AddTagComponent, {

    });

    dialogRef.afterClosed().subscribe(rTable => {
      console.log('The dialog was closed with result,', rTable);
      if (rTable) { // result not undefined
        if (identifier === 'translation') {
          // Make API call to add tags for translation
          var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
          var translationtags = [];
          for (var tag of rTable) {
            // Remove duplicates wrt existing tags for the translation
            if (!this.checkIfDuplicate(tag['tag'], this.translationTags)) {
              translationtags.push({ 'tag': tag['tag'] });
            } else {
              console.log("DUPLICATE TAG FOUND! ", tag);
            }
          }
          if (translationtags.length !== 0) {
            var translationTagsData = {
              "verse_id": verse_id,
              "translationtags": translationtags
            }
            console.log('ADDING TRANSLATION TAGS ', translationTagsData);

            this.db.postTranslationTags(translationTagsData).subscribe(result => {
              console.log(result);
              // Once result comes, add tags to translation tags
              if (result['status_code'] === 201 && result['message'] === "Successfully added translation tags") {
                for (var tag of result['payload']) {
                  this.translationTags.push({ 'tag': tag['tag'], 'subCategory': '', 'category': '', 'tag_id': tag['tag_id'], 'tagger': tag['tagger'], 'reviewer': tag['reviewer'], 'tagger_remark': tag['tagger_remark'], 'disabled': false });
                }
                console.log(JSON.stringify(this.translationTags));
              }
            }, (error) => {
              console.log(error);
            })
          }
        } else if (identifier === 'purportSection') {
          if (parseInt(index) !== -1) {

            // Make API call to add tags for purport
            var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
            var purportsectiontags = [];
            var ps = this.purportSections[parseInt(index)];
            for (var tag of rTable) {
              // Remove duplicates wrt existing tags for the purport section
              if (!this.checkIfDuplicate(tag['tag'], ps['tags'])) {
                purportsectiontags.push({ 'start_idx': ps['start_idx'], 'end_idx': ps['end_idx'], 'tag': tag['tag'] });
              } else {
                console.log("DUPLICATE TAG FOUND! ", tag);
              }
            }
            if (purportsectiontags.length !== 0) {
              var purportsectionTagsData = {
                "verse_id": verse_id,
                "purporttags": purportsectiontags
              }
              console.log('ADDING PURPORT SECTION TAGS ', purportsectionTagsData);
              this.db.postPurportSectionTags(purportsectionTagsData).subscribe(result => {
                console.log(result);
                // Once result comes, add tags to purport section tags
                if (result['status_code'] === 201 && result['message'] === "Successfully added purport tags") {
                  for (var tag of result['payload']) {
                    this.purportSections[parseInt(index)]['tags'].push({ 'tag': tag['tag'], 'subCategory': '', 'category': '', 'tag_id': tag['tag_id'], 'tagger': tag['tagger'], 'reviewer': tag['reviewer'], 'tagger_remark': tag['tagger_remark'], 'disabled': false });
                  }
                  console.log('ADDED TAGS to PURPORT SECTION ' + JSON.stringify(this.purportSections[parseInt(index)]['tags']));
                }
              }, (error) => {
                console.log(error);
              })
              console.log('ADD TAG: PURPORT ', this.purportSections);
            }
          } else {
            console.log('ADD TAG: WRONG INDEX PASSED FOR PURPORT SECTION');
          }
        }
      }

    });
  }

  removeTag(identifier, index, index2): void {

    if (identifier === 'translation') {
      // Check permissions
      if (parseInt(sessionStorage.getItem('account_type')) === 2) {
        if (this.translationTags[index2]['reviewer'] !== null) {
          window.alert('Cannot remove tag already reviewed!');
          return;
        }
        if (sessionStorage.getItem('authUsername') !== this.translationTags[index2]['tagger']) {
          window.alert('Cannot remove tag added by other!');
          return;
        }
      }
      // Make API call
      this.db.deleteTranslationTag(this.translationTags[index2]['tag_id']).subscribe(result => {
        console.log(result);
        // Once result comes, remove tag from translation tags
        if (result['status_code'] === 204 && result['message'] === "Successfully deleted translation tag") {
          this.translationTags.splice(index2, 1);
        }
      }, (error) => {
        console.log(error);
      })


    } else if (identifier === 'purportSection') {
      // Check permissions
      if (parseInt(sessionStorage.getItem('account_type')) === 2) {
        if (this.purportSections[parseInt(index)]['tags'][index2]['reviewer'] !== null) {
          window.alert('Cannot remove tag already reviewed!');
          console.log('')
          return;
        }
        if (sessionStorage.getItem('authUsername') !== this.purportSections[parseInt(index)]['tags'][index2]['tagger']) {
          window.alert('Cannot remove tag added by other!');
          return;
        }
      }
      // Make API call
      this.db.deletePurportSectionTag(this.purportSections[parseInt(index)]['tags'][index2]['tag_id']).subscribe(result => {
        console.log(result);
        // Once result comes, remove tag from purport section tags
        if (result['status_code'] === 204 && result['message'] === "Successfully deleted purport tag") {
          this.purportSections[parseInt(index)]['tags'].splice(index2, 1);
        }
      }, (error) => {
        console.log(error);
      })
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

    var newSection = {
      'start_idx': this.verseForm.controls['purportText'].value.indexOf(this.selectedText),
      'end_idx': this.verseForm.controls['purportText'].value.indexOf(this.selectedText) + this.selectedText.length - 1,
      'tags': []
    }
    console.log("NEW SECTION SELECTED ", newSection);
    // are indexes valid?
    if (newSection['start_idx'] >= 0 && newSection['end_idx'] <= this.verseForm.controls['purportText'].value.length - 1) {
      console.log('NEW SECTION VALID ', newSection);
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
        console.log('ADDING NEW PURPORT SECTION!');
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
    var inputText = this.newPurportSection;
    console.group("Input Text");
    console.log(inputText);
    console.groupEnd();

    var newSection = {
      'start_idx': this.verseForm.controls['purportText'].value.indexOf(inputText),
      'end_idx': this.verseForm.controls['purportText'].value.indexOf(inputText) + inputText.length - 1,
      'tags': []
    }

    console.log("NEW SECTION SELECTED ", newSection);
    // are indexes valid?
    if (newSection['start_idx'] >= 0 && newSection['end_idx'] <= this.verseForm.controls['purportText'].value.length - 1) {
      console.log('NEW SECTION VALID ', newSection);
      this.purportSections.push(newSection);
      this.purportSections.sort(function (a, b) { return a['start_idx'] === b['start_idx'] ? a['end_idx'] - b['end_idx'] : a['start_idx'] - b['start_idx'] });
      console.log('SORTED PURPORT SECTIONS ', this.purportSections);
      var indexNewSection = this.purportSections.lastIndexOf(newSection);
      if (this.checkNoExactOverlap(indexNewSection)) {
        this.addTag('purportSection', indexNewSection);
        console.log('ADDING NEW PURPORT SECTION!');
      } else {
        this.purportSections.splice(indexNewSection, 1);
        console.log('DUPLICATE PURPORT SECTION FOUND! ', this.purportSections);
      }
    }
    this.newPurportSection = "";

    //console.log("Selected Substring starts at index:", this.staticText.search(this.selectedText)," and ends at index:", this.staticText.search(this.selectedText)+this.selectedText.length-1)

  }



  // ADD REMARK FOR A TAG, VISIBLE ON HOVER
  // Permissions: Tagger can add remarks for his tags
  addTagRemark(identifier, index, index2) {
    if (identifier === "translation") {
      if (sessionStorage.getItem('authUsername') === this.translationTags[index2]['tagger'] && this.translationTags[index2]['reviewer'] === null) {
        console.log("ADD TAG REMARK called for ", identifier, " ", index, " ", index2);
        const dialogRef = this.dialog.open(TagRemarkComponent, {
          data: { remark: this.translationTags[index2]['tagger_remark'] }
        });

        dialogRef.afterClosed().subscribe(updatedRemark => {
          if (updatedRemark !== this.translationTags[index2]['tagger_remark']) {
            console.log("ADDING TAG REMARK ", updatedRemark);
            var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
            var translationTagsData = {
              "verse_id": verse_id,
              "translationtags": [
                {
                  "tagger_remark": updatedRemark,
                  "tag": this.translationTags[index2]['tag']
                }
              ]
            }
            this.db.addRemarkTranslationTag(translationTagsData).subscribe(result => {
              console.log(result);
              // Once result comes, update tagger_remark of translation tag
              if (result['status_code'] === 201 && result['message'] === "Successfully added translation tags") {
                this.translationTags[index2]['tagger_remark'] = result['payload'][0]['tagger_remark']
              }
            }, (error) => {
              console.log(error);
            })
          }

        });
      } else {
        window.alert('Cannot add remark to tag given by someone else or already reviewed!');
      }
    } else if (identifier === "purportSection") {
      if (sessionStorage.getItem('authUsername') === this.purportSections[index]['tags'][index2]['tagger'] && this.purportSections[index]['tags'][index2]['reviewer'] === null) {
        console.log("ADD TAG REMARK called for ", identifier, " ", index, " ", index2);
        const dialogRef = this.dialog.open(TagRemarkComponent, {
          data: { remark: this.purportSections[index]['tags'][index2]['tagger_remark'] }
        });

        dialogRef.afterClosed().subscribe(updatedRemark => {
          if (updatedRemark !== this.purportSections[index]['tags'][index2]['tagger_remark']) {
            console.log("ADDING TAG REMARK ", updatedRemark);
            var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
            var purportsectionTagsData = {
              "verse_id": verse_id,
              "purporttags": [
                {
                  "tagger_remark": updatedRemark,
                  "tag": this.purportSections[index]['tags'][index2]['tag'],
                  "start_idx": this.purportSections[index]['start_idx'],
                  "end_idx": this.purportSections[index]['end_idx']
                }
              ]
            }
            console.log(purportsectionTagsData);
            this.db.addRemarkPurportSectionTag(purportsectionTagsData).subscribe(result => {
              console.log(result);
              // Once result comes, update tagger_remark of the purport section tag
              if (result['status_code'] === 201 && result['message'] === "Successfully added purport tags") {
                this.purportSections[index]['tags'][index2]['tagger_remark'] = result['payload'][0]['tagger_remark']
              }
            }, (error) => {
              console.log(error);
            })
          }

        });
      } else {
        window.alert('Cannot add remark to tag given by someone else  or already reviewed!');
      }
    }

  }

  getPurportSectionText(index) {
    return this.verseForm.controls['purportText'].value.slice(this.purportSections[index]['start_idx'], this.purportSections[index]['end_idx'] + 1);
  }

  approveTranslationTags(tagIndexArray, psTagIndexArray) {
    if (tagIndexArray.length === 0) {
      this.approvePurportSectionTags(psTagIndexArray);
    }
    var i = tagIndexArray.pop();
    var data = {
      "verse_id": "1.1.1",
      "purport": "Purport by H.D.G Abhayacaranaravinda Bhaktivedanta Swami Srila Prabhupada"
    }
    this.db.approveTranslationTag(this.translationTags[i]['tag_id'], data).subscribe(result => {
      console.log(result);
      // Once result comes, add reviewer for the translation tag
      if (result['status_code'] === 202 && result['message'] === "Successfully reviewed translation tag") {
        this.translationTags[i]['reviewer'] = sessionStorage.getItem('authUsername');
        console.log('APPROVED TAG ', this.translationTags[i]);
        this.approveTranslationTags(tagIndexArray, psTagIndexArray);
      }
    }, (error) => {
      console.log(error);
    })
  }

  approvePurportSectionTags(psTagIndexArray) {

    if (psTagIndexArray.length === 0) return;
    var i = psTagIndexArray.pop();
    var data = {
      "verse_id": "1.1.1",
      "purport": "Purport by H.D.G Abhayacaranaravinda Bhaktivedanta Swami Srila Prabhupada"
    }
    this.db.approvePurportSectionTag(this.purportSections[i['psIndex']]['tags'][i['pstIndex']]['tag_id'], data).subscribe(result => {
      console.log(i);
      // Once result comes, add reviewer for the purport tag
      if (result['status_code'] === 202 && result['message'] === "Successfully reviewed purport tag") {
        this.purportSections[i['psIndex']]['tags'][i['pstIndex']]['reviewer'] = sessionStorage.getItem('authUsername');
        console.log('APPROVED TAG ', this.purportSections[i['psIndex']]['tags'][i['pstIndex']]);
        this.approvePurportSectionTags(psTagIndexArray);
      }
    }, (error) => {
      console.log(error);
    })
  }

  approveCurrentTags() {
    var translationTagIndexArray = [];
    for (let i = 0; i < this.translationTags.length; i++) {
      if (this.translationTags[i]['reviewer'] === null) {
        translationTagIndexArray.push(i);
      }
    }

    var psTagIndexArray = [];

    for (let i = 0; i < this.purportSections.length; i++) {
      for (let j = 0; j < this.purportSections[i]['tags'].length; j++) {
        if (this.purportSections[i]['tags'][j]['reviewer'] === null) {
          psTagIndexArray.push({ 'psIndex': i, 'pstIndex': j });

        }
      }
    }

    this.approveTranslationTags(translationTagIndexArray, psTagIndexArray);

  }

  proceedReviewPage() {
    this.route.navigate(['review-page']);
  }


  ///////// INNER FUNCTION CALLS

  // CHECKS IF NEW PURPORT SECTION DOES NOT EXACTLY OVERLAP WITH ANY EXISTING PS
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

  // CHECKS IF DUPLICATE TAG WHEN ADDING NEW TAGS 
  checkIfDuplicate(tagValue, existingTagArray) {
    for (var tag of existingTagArray) {
      if (tag['tag'] === tagValue) return true;
    }
    return false;
  }

  //////// REDUNDANT FUNCTION CALLS

  // onSubmitChanges() {
  //   var verse_id = this.verseSelectionForm.controls['canto'].value + '.' + this.verseSelectionForm.controls['chapter'].value + '.' + this.verseSelectionForm.controls['verse'].value;
  //   var translationtags = [];
  //   for (var tag of this.translationTags) {
  //     translationtags.push({ 'tag': tag['tag'] });
  //   }
  //   var translationTagsData = {
  //     "verse_id": verse_id,
  //     "translationtags": translationtags
  //   }
  //   console.log('SUBMITTING TRANSLATION TAGS ', translationTagsData);

  //   this.db.postTranslationTags(translationTagsData).subscribe(r => {
  //     console.log(r);
  //   }, (error) => {
  //     console.log(error);
  //   })


  //   var purportsectiontags = [];
  //   for (var ps of this.purportSections) {
  //     for (var tag of ps['tags']) {
  //       purportsectiontags.push({ 'start_idx': ps['start_idx'], 'end_idx': ps['end_idx'], 'tag': tag['tag'] });
  //     }
  //   }
  //   var purportsectionTagsData = {
  //     "verse_id": verse_id,
  //     "purporttags": purportsectiontags
  //   }
  //   console.log('SUBMITTING PURPORT SECTION TAGS ', purportsectionTagsData);
  //   this.db.postPurportSectionTags(purportsectionTagsData).subscribe(r => {
  //     console.log(r);
  //   }, (error) => {
  //     console.log(error);
  //   })

  // }
}

