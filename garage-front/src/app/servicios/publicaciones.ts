import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Publicacion, Resultado } from '../modelos/publicacion';

@Injectable({providedIn:'root'})

export class PublicacionesService {

  //Propiedades
  private http = inject(HttpClient);

                         //Metodos

  //Crear publicacion (ahora es form data por la foto)
  crear(titulo: string, descripcion: string, autor: string, imagen: File | null) {
    const datos = new FormData();
    datos.append('titulo', titulo);
    datos.append('descripcion', descripcion);
    datos.append('autor', autor);
    if (imagen) {
      datos.append('imagen', imagen);
    }
    return this.http.post(environment.apiUrl + '/publicaciones', datos);
  }
  /*
  traerTodas() {
    return this.http.get<Publicacion[]>(environment.apiUrl + '/publicaciones');
  }*/

  
  traer(orden: string, offset: number, limit: number, autor?: string) {
    let direccion = environment.apiUrl + '/publicaciones?orden=' + orden + '&offset=' + offset + '&limit=' + limit;
    if (autor) {
      direccion = direccion + '&autor=' + autor;
    }
    return this.http.get<Resultado>(direccion);
  }



  darMeGusta(idPublicacion: string, usuario: string) {
   return this.http.post<Publicacion>(environment.apiUrl + '/publicaciones/' +
    idPublicacion + '/me-gusta', {usuario:usuario});

  }

  sacarMeGusta(idPublicacion: string, usuario: string) {
    return this.http.delete<Publicacion>(environment.apiUrl + '/publicaciones/' +
    idPublicacion + '/me-gusta/' + usuario);
  }




}
