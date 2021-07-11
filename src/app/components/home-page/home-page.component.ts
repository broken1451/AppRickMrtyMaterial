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

  constructor(private router: Router,private rickmortyService: RickmortyService) { }

  ngOnInit(): void {
    this.getAllCharacter()
  }
  


  getAllCharacter(){
    this.rickmortyService.getAllCharacters().subscribe(character =>{
      this.chatacters = character.data
      console.log(character)
    })
  }

  goToDetails(item: any){
    this.router.navigate(['/rickMorty/details/', item.id])
  }

}
