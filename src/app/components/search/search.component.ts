import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RickmortyService } from '../../services/rickmorty.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public characterSearched: any[] = []

  public form: FormGroup = this.formBuilder.group({
    search: ['', Validators.required],
  });

  get valueForm(){
    return this.form.controls
  }

  constructor(private rickmortyService: RickmortyService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  searchByName(value:string) {
    this.characterSearched = []

    if (value.trim().length === 0) {
      return;
    }
   
    this.rickmortyService.getCharacterByName(value).subscribe((data: any)=>{
      this.characterSearched = data.data.results;
      console.log(' this.characterSearched ',  this.characterSearched)
    }, error=>{
      console.log('Error: ', error)
    })
  }


}
