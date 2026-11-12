import { inject, Injectable } from '@angular/core';
import { Publicacion } from '../modelos/publicacion';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
  
  traerTodas() {
    return this.http.get<Publicacion[]>(environment.apiUrl + '/publicaciones');
  }

}
