import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/hero.interface';
import { map } from 'rxjs/operators';
// fijarse siempre que los modulos esten importantados en appmodule
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  // tslint:disable-next-line:no-inferrable-types
  heroesUrl: string = 'https://heroesapp-c1acc.firebaseio.com/heroes.json';
  // tslint:disable-next-line:no-inferrable-types
  heroUrl: string = 'https://heroesapp-c1acc.firebaseio.com/heroes/';
 
  constructor( private http: HttpClient) { }
  newHero(hero: Heroe) {
    const body = JSON.stringify(hero);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    // la funcion que retorna un post es un observable
    return this.http.post( this.heroesUrl, body, {headers} ).pipe(
      map( res => {
        return res;
      })
     );
  }


  updateHero(hero: Heroe, key$: string) {
    const body = JSON.stringify(hero);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.heroUrl}/${key$}.json`;
    return this.http.put( url, body, {headers} ).pipe(
      map( res => {
        return res;
      })
     );
  }
  // https://heroesapp-c1acc.firebaseio.com/heroes/-LVl9h2d99ffzMd-EX37

  getHero(key$: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.heroUrl}/${key$}.json`;
    return this.http.get(url).pipe( map( (res: any) => {
      return res; }
    ));
  }

  getHeroes() {
    return this.http.get(this.heroesUrl).pipe( map( (res: any) => {
      return res; }
    ));
  }

  deleteHeroe(key$: string) {
    const url = `${this.heroUrl}/${key$}.json`;
    return this.http.delete(url).pipe(map( res => res ));
  }
}
