import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  if (this.formPublicacion.invalid) {
    this.formPublicacion.markAllAsTouched();
    return;
  }
  console.log(this.formPublicacion.value, this.imagen);
}




}
