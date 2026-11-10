import { Component,signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';
import { PublicacionesService } from '../../servicios/publicaciones';

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
    this.imagen = evento.target.files[0];
    if (this.imagen) {
      this.vistaPrevia = URL.createObjectURL(this.imagen);
    }
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
      usuario._id
    ).subscribe({
      next: (publicacion)=> {
        this.router.navigate(['/garage/publicaciones']);
      },
      error: (error)=> {
        if (error.status === 0){
          this.mensajeError.set('No se pudo conectar con el servidor');
        }else{
          this.mensajeError.set('No se pudo publicar');
        }
      }
    });
  }




}
