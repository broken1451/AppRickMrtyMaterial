import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RickmortyService } from 'src/app/services/rickmorty.service';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

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
  public locations: any[] = [];
  public locationsCharacters: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  
  panelOpenState = false;
  displayedColumns: string[] = [
    // 'select',
    'episode',
    'name',
    'created',
    'air_date',
    'icon'
  ];

  displayedLocation: string[] = [
    // 'select',
    'id',
    'air_date',
    'created',
    'episode',
    'name',
    'url'
  ];
  boleanCheck: boolean = false;
  dataSource = new MatTableDataSource<any[]>();
  dataSourceLocations = new MatTableDataSource<any[]>();
  dataSourceLocationsCharacter = new MatTableDataSource<any[]>();
  selection = new SelectionModel<any>(true, []);

  constructor(private rickMortyService: RickmortyService, private router: Router) {
    console.log( this.dataSourceLocations.data )
  }

  ngOnInit(): void {
    this.getAllEpisode();
    this.getAllLocations();
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
    });
  }

  getAllLocations() {
    this.rickMortyService.getAllEpisodies().subscribe((data: any) => {
      console.log('locations', data.data);
      this.dataSourceLocations.data =  data.data.results;
      this.dataSourceLocationsCharacter.data =  data.data.results.characters;
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


  goDetails(episodie: any){
    this.router.navigate(['/rickMorty/details/', episodie.id])
    console.log(episodie)
  }
}
