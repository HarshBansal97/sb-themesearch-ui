import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface Tag {
  tag: string;
  subCategory: string;
  category: string;
}

const TAG_DATA: Tag[] = [
  {tag: 'Omnipotence', subCategory: 'Ishvara Tattva - Greatness', category: 'Philosophical'},
  {tag: 'Above Maya', subCategory: 'Ishvara Tattva - Greatness', category: 'Philosophical'},
  {tag: 'Reservoir of all rasas', subCategory: 'Ishvara Tattva - Sweetness', category: 'Philosophical'},
  {tag: 'Shukadev Govami', subCategory: 'Important Personalities', category: 'Historical'},
];
@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent{

  constructor(
    public dialogRef: MatDialogRef<AddTagComponent>
  ) {}
  
  displayedColumns: string[] = ['select', 'tag', 'subCategory', 'category'];
  dataSource = new MatTableDataSource<Tag>(TAG_DATA);
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
        console.log("SELECTED ROW: ",row);
        rows.push(row);
      }
    });
    this.dialogRef.close(rows);
  }

}
