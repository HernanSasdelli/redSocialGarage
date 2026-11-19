import { Component,inject, signal } from '@angular/core';
import { Publicacion } from '../../modelos/publicacion';
import { CardPublicacion } from '../../componentes/card-publicacion/card-publicacion';

import { Auth } from '../../servicios/auth';
import { DatePipe } from '@angular/common';
import { PublicacionesService } from '../../servicios/publicaciones';

@Component({
  imports: [CardPublicacion, DatePipe],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {

  //Propiedades
  private auth = inject(Auth);
  private publicacionesService = inject(PublicacionesService);

  usuario = this.auth.usuarioActual();
  
  //mis publicaciones
  publicaciones = signal<Publicacion[]>([]);
  total = signal(0);
  limit = 3;


  //Metodos

  ngOnInit() {
     this.verMas();
  }

  verMas() {
    const desde = this.publicaciones().length;
    this.publicacionesService.traer('fecha', desde, this.limit, this.usuario._id).subscribe((resultado) => {
      const lista = this.publicaciones();
      for (const pub of resultado.publicaciones) {
        lista.push(pub);
      }
      this.publicaciones.set([...lista]);
      this.total.set(resultado.total);
    });
  }
    
  //vacio la lista y traigo de nuevo las ultimas(es para el borrar este)
  recargar() {
    this.publicaciones.set([]);
    this.verMas();
  }

  //veo el largo, si el largo es +chico que el total, hay mas publicaciones
  hayMas() {
    return this.publicaciones().length < this.total();
  }

}