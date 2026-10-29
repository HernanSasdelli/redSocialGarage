import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, ValidatorFn,ValidationErrors, AbstractControl } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgValidationError } from '@angular/forms/signals';

import { contrasenaSegura, contrasenaCoinciden } from '../../validadores/usuario.validators';

//FUnciones


@Component({
  imports: [ReactiveFormsModule,RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {

  //propiedades
  dias: number [] = [];
  meses: string[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  anios: number[] = [];

  vistaPrevia = 'Piloto.png';

  foto: File | null=null;

  contrasena = new FormControl('', { validators: [Validators.required, contrasenaSegura()] });

  //Formulario de registro
  formRegistro = new FormGroup({
    nombre: new FormControl('',{ validators: [Validators.required, Validators.maxLength(30), Validators.minLength(2)]}),
    apellido: new FormControl('', {validators: [Validators.required, Validators.maxLength(30), Validators.minLength(2)]}),
    correo: new FormControl('',{ validators: [Validators.required, Validators.email]}),
    usuario: new FormControl('', {validators: [Validators.required, Validators.maxLength(20), Validators.minLength(2)]}),
    contrasena: this.contrasena,
    repetir: new FormControl('', {validators: [ Validators.required, contrasenaCoinciden(this.contrasena)]}),
    
    dia: new FormControl('',{ validators: [Validators.required]}),
    mes: new FormControl('',{ validators: [Validators.required]}),
    anio: new FormControl('',{ validators: [Validators.required]}),

    descripcion: new FormControl('', {validators: [Validators.required, Validators.maxLength(140)]})
  });

    //CONSTRUCTOR
    constructor(){
      const anioActual = new Date().getFullYear();
      

      for(let d=1; d <= 31; d++ ){
        this.dias.push(d);
      }
      
    
      for (let a=anioActual; a >= (anioActual-100);a-- ){
        this.anios.push(a);

      }   

    }


    //Metodos
    registrarme (){
      if(this.formRegistro.invalid){
        this.formRegistro.markAllAsTouched();
        for (const nombre in this.formRegistro.controls) {
            const control = this.formRegistro.get(nombre);
            if (control?.invalid) {
              console.log(nombre, control.errors);
            }
          }
        return;
      }
      console.log(this.formRegistro.value, this.foto) 
    };

    elegirFoto(evento: any) {
        this.foto = evento.target.files[0];
        if (this.foto) {
          this.vistaPrevia = URL.createObjectURL(this.foto);
        }
    }
    



  }



