import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { DbService } from '../db.service';
import { Globals } from '../globals';

export interface Tag {
  tag: string;
  subCategory: string;
  category: string;
}


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {


  constructor(
    public dialogRef: MatDialogRef<AddTagComponent>,
    private db: DbService,
    public gb: Globals,
  ) { }

  // TAG_DATA: Tag[] = this.getTagsFromDB();

  // getTagsFromDB() {
  //   console.log('CALLING EXPORT TAGS');
  //   var tagsData = this.gb.rawTags;
  //   var returnTags: Tag[] = [];
  //   var categories = tagsData['outline'];
  //   for (var cat of categories) {
  //     var categoryText = cat['text'];
  //     var subCategories = cat['outline'];
  //     for (var subCat of subCategories) {
  //       var subCategoryText = subCat['text'];
  //       var tags = subCat['outline'];
  //       for (var tag of tags) {
  //         var tagText = tag['text'];
  //         returnTags.push({ 'tag': tagText, 'subCategory': subCategoryText, 'category': categoryText })
  //       }
  //     }
  //   }
  //   return returnTags;
  // }
  displayedColumns: string[] = ['select', 'tag', 'subCategory', 'category'];
  dataSource = new MatTableDataSource<Tag>(this.gb.tagsForTable);
  selection = new SelectionModel<Tag>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Tag): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  add(): void {
    var rows = []
    this.dataSource.data.forEach(row => {
      if (this.selection.isSelected(row)) {
        console.log("SELECTED ROW: ", row);
        rows.push(row);
      }
    });
    for (var _i = 0; _i < rows.length; _i++) {
      rows[_i]['disabled'] = false;
    }
    if (rows.length === 0) {
      window.alert("Please select a tag")
    } else {
      this.dialogRef.close(rows);
    }

    
  }

  close(): void {
    this.dialogRef.close();
  }

}
