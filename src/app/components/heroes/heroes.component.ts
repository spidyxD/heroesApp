import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: []
})
export class HeroesComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  loading: boolean = true;
  heroes: any[] = [];
  constructor(private _heroesService: HeroesService, private router: Router) {
    this._heroesService.getHeroes().subscribe((data: any) => {
        setTimeout(() =>  { this.heroes = data, this.loading = false; }, 100 );
        // esta es una forma para recibir los datos del
        // crud de firebase no obstante es ineficiente es mejor trabajarla con pipes
        /*for (const key$ in data) {
          if (data.hasOwnProperty(key$)) {
            const element = data[key$];
            console.log( element );
          this.heroes.push( element);
          }
        }*/
    });
  }

  ngOnInit() {
  }

  deleteHero(key$: string) {
    this._heroesService.deleteHeroe(key$).subscribe(
      (resp: any) => {
        if (resp) {
          console.error(resp);
        } else {
            // se elimino correctamente
            // revisar las notas del pipe pq se necesita el pure 
            // para verificar los valores del array
            delete this.heroes[key$];
        }
      }
    );
  }


}
