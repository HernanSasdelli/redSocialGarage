import { Component, input } from '@angular/core';
import { Publicacion } from '../../modelos/publicacion';
import { DatePipe } from '@angular/common';


@Component({
  imports: [ DatePipe],
  selector: 'app-card-publicacion',
  styleUrl: './card-publicacion.css',
  templateUrl: './card-publicacion.html',
})
export class CardPublicacion {

  //Propiedades
  publicacion = input.required<Publicacion>();
}
