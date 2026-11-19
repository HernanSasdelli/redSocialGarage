import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PublicacionesService } from '../../servicios/publicaciones';
import { ComentariosService } from '../../servicios/comentarios';
import { Publicacion, Comentarios } from '../../modelos/publicacion';
import { CardPublicacion } from '../../componentes/card-publicacion/card-publicacion';

@Component({
  selector: 'app-ver-publicacion',
  imports: [ReactiveFormsModule, DatePipe, CardPublicacion],
  templateUrl: './ver-publicacion.html',
  styleUrl: './ver-publicacion.css',
})
export class VerPublicacion {

  private ruta = inject(ActivatedRoute);
  private router = inject(Router);
  private publicacionesService = inject(PublicacionesService);
  private comentariosService = inject(ComentariosService);

  idPublicacion = '';
  publicacion = signal<Publicacion | null>(null);
  comentarios = signal<Comentarios[]>([]);
  total = signal(0);
  limit = 5;

  formComentario = new FormGroup({
    texto: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  ngOnInit() {
    //el id viene en la url: garage/publicacion/:id
    this.idPublicacion = this.ruta.snapshot.paramMap.get('id')!;
    this.publicacionesService.traerUnaPublicacion(this.idPublicacion).subscribe((publicacion) => {
      this.publicacion.set(publicacion);
    });
    this.cargarMas();
  }

  //traigo los siguientes y los sumo abajo, igual que en el perfil
  cargarMas() {
    const desde = this.comentarios().length;
    this.comentariosService.traer(this.idPublicacion, desde, this.limit).subscribe((resultado) => {
      const lista = this.comentarios();
      for (const comentario of resultado.comentarios) {
        lista.push(comentario);
      }
      this.comentarios.set([...lista]);
      this.total.set(resultado.total);
    });
  }

  //si la lista es mas corta que el total, hay mas
  hayMas() {
    return this.comentarios().length < this.total();
  }

  //comento y recargo la lista, asi el nuevo queda arriba
  comentar() {
    if (this.formComentario.invalid) {
      this.formComentario.markAllAsTouched();
      return;
    }
    const texto = this.formComentario.value.texto!;
    this.comentariosService.crear(this.idPublicacion, texto).subscribe(() => {
      this.formComentario.reset();
      this.comentarios.set([]);
      this.cargarMas();
    });
  }

  volverAlFeed() {
    this.router.navigate(['/garage/publicaciones']);
  }
}