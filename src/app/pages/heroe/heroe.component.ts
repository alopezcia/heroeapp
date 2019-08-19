import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute }  from '@angular/router';

import Swal from 'sweetalert2';
import {Observable} from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo' ){
      this.heroesService.getHeroe(id)
        .subscribe( (resp:any) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  guardar( form: NgForm ){
    if ( !form.valid ) {
      console.log("Formulario no válido!");
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    })
  }
}
