import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RickmortyService {

  constructor(private httpClient: HttpClient) { }

  
  getAllCharacters() {
    return this.httpClient.get(`${environment.baseUrl}/character`).pipe(
      take(1),
      map((data: any)=>{
        return{
          info: data.info,
          data: data.results
        }
      })
    )
  }

  getAllCharactersByPage(page: number) {
    const params = new HttpParams()
    .set('page', String(page))
    return this.httpClient.get(`${environment.baseUrl}/character`, {params}).pipe(
      take(1),
      map((data: any)=>{
        return{
          info: data.info,
          data: data.results
        }
      })
    )
  }

  getCharacter(id: number | string) {
    return this.httpClient.get(`${environment.baseUrl}/character/${id}`).pipe(
      take(1),
      map((data: any)=>{
        return{
          data: data
        }
      })
    )
  }

  getCharacterByName(name: string) {
    const params = new HttpParams()
    .set('name', name)
  
    return this.httpClient.get(`${environment.baseUrl}/character/`,{params}).pipe(
      take(1),
      map((data: any)=>{
        return{
          data: data
        }
      })
    )
  }

  getAllEpisodies() {
    return this.httpClient.get(`${environment.baseUrl}/episode`).pipe(
      take(1),
      map((data: any)=>{
        return{
          data: data
        }
      })
    )
  }

  getAllLocations() {
    return this.httpClient.get(`${environment.baseUrl}/location`).pipe(
      take(1),
      map((data: any)=>{
        return{
          data: data
        }
      })
    )
  }


}
