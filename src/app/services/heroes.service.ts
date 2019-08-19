import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-fd9ff.firebaseio.com';

  constructor(private http: HttpClient ) { }


  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${ this.url}/heroes.json`, heroe)
      .pipe( 
        map( (resp:any) => {
          heroe.id = resp.name;
          return heroe;
        }
      ));
  }

  actualizarHeroe( heroe: HeroeModel ){
    // Para no grabar el id dentro
    const heroeTmp = {
      ...heroe
    };
    delete heroeTmp.id;
    return  this.http.put( `${ this.url}/heroes/${heroe.id}.json`, heroeTmp );
  }

  getHeroe( id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe( 
        // map( resp => this.createArreglo(resp)) equivalente al siguiente
        map( this.createArreglo ),
        delay(0)
      );
  }

  private createArreglo(heroesObj: Object ){
    const heroes: HeroeModel[] = [];
    if ( heroes == null ){
      return [];
    }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    })
    return heroes;
  }

  borrarHeroe( id: string ) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
