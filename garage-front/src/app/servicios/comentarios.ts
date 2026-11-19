import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Comentarios, ResultadoComentarios } from '../modelos/publicacion';

@Injectable({providedIn:'root'})
export class ComentariosService {

  private http = inject(HttpClient);

  //los de una publicacion, de a pedazos
  traer(publicacion: string, offset: number, limit: number) {
    const direccion = environment.apiUrl + '/comentarios?publicacion=' + publicacion +
      '&offset=' + offset + '&limit=' + limit;
    return this.http.get<ResultadoComentarios>(direccion);
  }

  //comentar, el autor lo saca el back del token
  crear(publicacion: string, texto: string) {
    return this.http.post<Comentarios>(environment.apiUrl + '/comentarios',
      {publicacion:publicacion, texto:texto});
  }

  //editar mi comentario
  editar(id: string, texto: string) {
    return this.http.put<Comentarios>(environment.apiUrl + '/comentarios/' + id, {texto:texto});
  }
}