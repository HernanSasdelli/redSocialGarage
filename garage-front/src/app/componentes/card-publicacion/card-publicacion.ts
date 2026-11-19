import { Component, input, output} from '@angular/core';
import { Publicacion } from '../../modelos/publicacion';
import { DatePipe } from '@angular/common';

import { inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../servicios/auth';
import { PublicacionesService } from '../../servicios/publicaciones';
import { RuedaMeGusta } from '../rueda-me-gusta/rueda-me-gusta';
import { Ocultar } from '../../directivas/ocultar';
import { Modal } from '../modal/modal';
import { Router } from '@angular/router';
import { ComentariosService } from '../../servicios/comentarios';
import { Comentarios } from '../../modelos/publicacion';



@Component({
  imports: [ DatePipe, RuedaMeGusta, Ocultar, Modal],
  selector: 'app-card-publicacion',
  styleUrl: './card-publicacion.css',
  templateUrl: './card-publicacion.html',
})
export class CardPublicacion {

  //Propiedades
  publicacion = input.required<Publicacion>();

  private auth = inject(Auth);
  private publicacionesService = inject(PublicacionesService);
  private router = inject(Router);
  private comentariosService = inject(ComentariosService);

      //manejo me gusta
  yaDiMeGusta = signal(false);
  cantidadMeGusta = signal(0);

      //manejo de publicaciones borradas
  confirmando = signal(false);
  borrada = output<void>();

      //ultimos comentarios abajo de la card
  mostrarComentarios = input(true);//en la pagina grande viene en false
  comentarios = signal<Comentarios[]>([]);

  ngOnInit() {
    this.mostrarMeGusta(this.publicacion());

    //traigo los 2 ultimos comentarios
    if (this.mostrarComentarios()) {
      const id = this.publicacion()._id;
      this.comentariosService.traer(id, 0, 2).subscribe((resultado) => {
        this.comentarios.set(resultado.comentarios);
      });
    }
  }

  //se fija si yo estoy en la lista y guarda el numero
  mostrarMeGusta(publicacion: Publicacion) {
    const yo = this.auth.usuarioActual()._id;
    let estoy = false;
    for (const megusta of publicacion.meGusta) {
      if (megusta.usuario === yo) {
        estoy = true;
      }
    }
    this.yaDiMeGusta.set(estoy);
    this.cantidadMeGusta.set(publicacion.cantidadMeGusta);
  }

  
  tocarMeGusta() {
    const yo = this.auth.usuarioActual()._id;
    const id = this.publicacion()._id;
    if (this.yaDiMeGusta()) {
      this.publicacionesService.sacarMeGusta(id).subscribe(publicacion => this.mostrarMeGusta(publicacion));
    } else {
      this.publicacionesService.darMeGusta(id).subscribe(publicacion => this.mostrarMeGusta(publicacion));
    }
  }

  esMia() {
    const yo = this.auth.usuarioActual()._id;
    return this.publicacion().autor._id === yo;
  }


    //abro y cierro el modal
  preguntarBorrar() {
    this.confirmando.set(true);
  }

  cancelarBorrar() {
    this.confirmando.set(false);
  }

  //si dijo que si, la borro y aviso
  confirmarBorrar() {
   // const yo = this.auth.usuarioActual()._id;
    const id = this.publicacion()._id;
    this.publicacionesService.borrar(id).subscribe(() => {
      this.confirmando.set(false);
      this.borrada.emit();
    });
  }


    abrirPubliGrande() {
    const id = this.publicacion()._id;
    this.router.navigate(['/garage/publicacion', id]);
  }

}