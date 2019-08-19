import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
}
