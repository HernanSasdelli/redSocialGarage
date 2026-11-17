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
  orden = signal('fecha');
  offset = signal(0);
  limit = 10;
  
  total = signal(0);

  //Constructor
  constructor(private publicacionesService: PublicacionesService) {}

      //Metodos


  ngOnInit() {
       this.cargar();
    
  }

  cargar() {
    this.publicacionesService.traer(this.orden(), this.offset(), this.limit).subscribe((resultado) => {
      this.publicaciones.set(resultado.publicaciones);

      this.total.set(resultado.total);
    });
  

  ordenarPor(orden: string) {
    this.orden.set(orden);
    this.offset.set(0);
    this.cargar();
  }

  siguiente() {
    this.offset.set(this.offset() + this.limit);
    this.cargar();
  }
  anterior() {
    this.offset.set(this.offset() - this.limit);
    this.cargar();
  }

  hayAnterior() {
    return this.offset() > 0;
  }

  haySiguiente() {
    return this.offset() + this.limit < this.total();
  }

  paginaActual() {
    return this.offset() / this.limit + 1;
  }

  totalPaginas() {
    return Math.ceil(this.total() / this.limit);
  }
}
