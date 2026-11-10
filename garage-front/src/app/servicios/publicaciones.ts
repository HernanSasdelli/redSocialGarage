import { inject, Injectable } from '@angular/core';
import { Publicacion } from '../modelos/publicacion';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})

export class PublicacionesService {

  //Propiedades
  private http = inject(HttpClient);

                         //Metodos

  //Crear publicacion
  crear(titulo: string, descripcion: string, autor: string) {
    return this.http.post(environment.apiUrl + '/publicaciones', {
      titulo:titulo,
      descripcion:descripcion,
      autor:autor
    });
  }

  //Traer todas las publicaciones
  traerTodas() {
    return this.http.get<Publicacion[]>(environment.apiUrl + '/publicaciones');
  }

}
