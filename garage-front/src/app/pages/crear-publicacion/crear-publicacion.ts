import { Component,signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';
import { PublicacionesService } from '../../servicios/publicaciones';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-crear-publicacion',
  styleUrl: './crear-publicacion.css',
  templateUrl: './crear-publicacion.html',
})
export class CrearPublicacion {

  //Propiedad
  formPublicacion = new FormGroup ({
    titulo : new FormControl('',{ validators: [Validators.required, Validators.maxLength(80)]}) ,
    descripcion : new FormControl('',{ validators: [Validators.required, Validators.maxLength(400)]})
  })

  imagen: File | null = null;
  vistaPrevia = '';
  mensajeError = signal('');

  //Constructor
  constructor(private router: Router, private auth: Auth, private publicacionesService: PublicacionesService) {}


        //Metodos

  //Metodo para subir imagen
  elegirImagen(evento: any) {
    const archivo = evento.target.files[0];
    if (!archivo) {
      return;
    }
    //maximo 5 MB, igual que en el back
    if (archivo.size > 5 * 1024 * 1024) {
      this.mensajeError.set('La imagen no puede pesar más de 5 MB');
      evento.target.value = '';
      return;
    }
    this.mensajeError.set('');
    this.imagen = archivo;
    this.vistaPrevia = URL.createObjectURL(archivo);
  }

  //Publicar
  publicar() {
    this.mensajeError.set('');

    if (this.formPublicacion.invalid) {
      this.formPublicacion.markAllAsTouched();
      return;
    }

    const usuario = this.auth.usuarioActual();

    this.publicacionesService.crear(
      this.formPublicacion.value.titulo!,
      this.formPublicacion.value.descripcion!,
      usuario._id,
      this.imagen
    ).subscribe({
      next: () => this.router.navigate(['/garage/publicaciones']),
      error: (error) => this.mostrarError(error)
    });
  }
    mostrarError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.mensajeError.set('No se pudo conectar con el servidor');
    } else if (error.status === 413) {
      this.mensajeError.set('La imagen no puede pesar más de 5 MB');
    } else if (error.status === 400) {
      this.mensajeError.set(error.error.message.join(', '));
    } else if (error.status === 500) {
      this.mensajeError.set(error.error.message);
    } else {
      this.mensajeError.set('No se pudo publicar, probá de nuevo');
    }
  }



}
