import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RickmortyService } from '../../services/rickmorty.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public characterSearched: any[] = []
  public loading: boolean = false;

  public form: FormGroup = this.formBuilder.group({
    search: ['', Validators.required],
  });

  get valueForm(){
    return this.form.controls
  }

  constructor(private _snackBar: MatSnackBar,private toastr: ToastrService ,private rickmortyService: RickmortyService ,private router: Router ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  searchByName(value:string) {
    this.characterSearched = []  
    this.loading = true;
    if (value.trim().length === 0) {
      this.loading = false;
      return;
    }
   
    this.rickmortyService.getCharacterByName(value).subscribe((data: any)=>{
      setTimeout(() => {
        this.characterSearched = data.data.results;
        this.loading = false;
      }, 2000);
    }, error=>{
      console.log('Error: ', error)
      // if (this.loading == true) {
        this.openSnackBar(error.error.error)
      // }
    })
  }

  goToDetails(item: any){
    this.router.navigate(['/rickMorty/details/', item.id])
  }

  openSnackBar(msg: string) {
    this.toastr.error(msg, `El  personaje con el termino ${this.valueForm.search.value} no existe`,{
      timeOut: 3000,
    });
    // this._snackBar.open(msg, '', {
    //   horizontalPosition: 'center',
    //   verticalPosition: 'bottom',
    //   duration: 5 * 1000,

    // });
    this.loading = false;
  }

}
