import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RickmortyService } from 'src/app/services/rickmorty.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-episodies',
  templateUrl: './episodies.component.html',
  styleUrls: ['./episodies.component.scss'],
  animations: [],
})
export class EpisodiesComponent implements OnInit, AfterViewInit, AfterContentInit {
  public episodies: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA: any[] = [];
  ELEMENT_DATA1: any[] = [];
  panelOpenState = false;
  displayedColumns: string[] = [
    'select',
    'episode',
    'name',
    'created',
    'air_date',
  ];
  boleanCheck: boolean = false;
  dataSource = new MatTableDataSource<any[]>(this.ELEMENT_DATA);
  selection = new SelectionModel<any>(true, []);

  constructor(private rickMortyService: RickmortyService) {
    console.log(this.dataSource.data)
  }

  ngOnInit(): void {
    this.getAllEpisode();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentInit(){
    // this.checkboxLabel()
  }

  getAllEpisode() {
    this.rickMortyService.getAllEpisodies().subscribe((data: any) => {
      console.log(data.data);
      this.dataSource.data =  data.data.results;
      console.log( this.dataSource.data );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected?.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
          return this.selection.select(row);
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    row.acepto = this.boleanCheck;
    if ( this.selection.selected.length >= 1) {
      this.checkboxLabel1(row.acepto)
      console.log('aquiii ', this.selection.selected )
    } else {
      console.log('HEREEEEE')
      row.acepto = false
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  checkboxLabel1(acepto?: boolean): any {
    console.log("acepto ====> ", acepto)
    if (!acepto) {
      console.log('pase pr acaaa !ACEPTOOOOOOO')
      this.boleanCheck = true
    }

  }
}
