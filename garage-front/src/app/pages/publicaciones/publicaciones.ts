import { Component,signal } from '@angular/core';
import { CardPublicacion } from '../../componentes/card-publicacion/card-publicacion';
import { Publicacion } from '../../modelos/publicacion';
import { PublicacionesService } from '../../servicios/publicaciones';

@Component({
  imports: [CardPublicacion],
  selector: 'app-publicaciones',
  styleUrl: './publicaciones.css',
  templateUrl: './publicaciones.html',
})
export class Publicaciones {

  //Propiedades
  publicaciones = signal<Publicacion[]>([]);

  //Constructor
  constructor(private publicacionesService: PublicacionesService) {}

      //Metodos


  ngOnInit() {
    this.publicacionesService.traerTodas().subscribe((lista) => {
      this.publicaciones.set(lista);
    });
  }
  
}
