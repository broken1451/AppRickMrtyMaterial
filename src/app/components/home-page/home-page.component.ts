import { Component, OnInit } from '@angular/core';
import { RickmortyService } from 'src/app/services/rickmorty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    
  public chatacters: any[] = []
  public pagenext:number = 1;
  public loading: boolean = true;

  constructor(private router: Router,private rickmortyService: RickmortyService) { }

  ngOnInit(): void {
    this.getAllCharacter()
  }
  


  getAllCharacter(){
    this.rickmortyService.getAllCharacters().subscribe(character =>{
      setTimeout(() => {
        this.chatacters = character.data
        this.loading = false;
      }, 2500);
    })
  }

  goToDetails(item: any){
    this.router.navigate(['/rickMorty/details/', item.id])
  }

  next(number: number){
    this.pagenext =  this.pagenext + number;
    this.loading = true;
    this.rickmortyService.getAllCharactersByPage(this.pagenext).subscribe(character=>{
      setTimeout(() => {
        this.chatacters = character.data
        this.loading = false;
      }, 2500);
     
    });
  }

  previous(number: number){
    this.loading = true;
    this.pagenext =  this.pagenext + (number);
    if ( this.pagenext == 0) {
      this.pagenext = 1;
      return;
    }
    this.rickmortyService.getAllCharactersByPage(this.pagenext).subscribe(character=>{
      setTimeout(() => {
        this.chatacters = character.data
        this.loading = false;
      }, 2500);
    });
  }

}
