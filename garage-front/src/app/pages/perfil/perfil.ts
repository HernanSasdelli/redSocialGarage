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

  //Metodos

  //Cuando se abre la pantalla, traigo las publicaciones y me quedo con las mias
  ngOnInit() {
    this.publicacionesService.traerTodas().subscribe((lista) => {
      const mias: Publicacion[] = [];
      for (const pub of lista) {
        if (pub.autor._id === this.usuario._id) {
          mias.push(pub);
        }
      }
      this.publicaciones.set(mias);
    });
  }

}