import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// recordar que tambien los imports deben estar en el appmodule
import { Heroe } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: []
})
export class HeroeComponent implements OnInit {
   heroe: Heroe = {
     name: '',
     bio: '',
     company: ''
  };
  // tslint:disable-next-line:no-inferrable-types
  flag: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  id: string = '';
  // activatedroute es para recibir un parametro especifico
  constructor(private _heroesService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        if (this.id !== 'new') {
          this._heroesService.getHero(this.id).subscribe
          ((hero: Heroe) => this.heroe = hero);
          console.log(this.heroe);
        }

    });
  }

  ngOnInit() {
  }
  saveData() {
      console.log(this.heroe);
      if (this.id === 'new') {
        // inserting
        this._heroesService.newHero(this.heroe).
        subscribe(data => {
          console.log(data);
          this.router.navigate(['/heroe', data['name']]);
        },
        error => console.log(error));
      } else {
        // updating
        this._heroesService.updateHero(this.heroe, this.id).
        subscribe(data => {
          console.log(data);
        },
        error => console.log(error));
      }
    }
    addNewHero(forma: NgForm) {
        this.router.navigate(['/heroe', 'new']);
        // recibe un objeto con las mismas propiedades de la interfaz
        forma.reset({
          name: '',
          bio: '',
          company: 'Marvel'
        });

    }
}
