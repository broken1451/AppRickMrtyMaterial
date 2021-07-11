import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RickmortyService } from 'src/app/services/rickmorty.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public character: any;

  constructor(private activateRoute: ActivatedRoute, private rickmortyService: RickmortyService) { }

  ngOnInit(): void {
  
    this.activateRoute.params.pipe(
      switchMap(({id}: any) => {
        return this.getCharacter(id);
      })
    ).subscribe(data=>{
      this.character = data;
    })


  }


  getCharacter(id: string | number): Observable<any>{
    return this.rickmortyService.getCharacter(id)
  }

}
