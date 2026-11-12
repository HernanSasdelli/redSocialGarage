import { Component,signal} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, ValidatorFn,ValidationErrors, AbstractControl } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgValidationError } from '@angular/forms/signals';

import { contrasenaSegura, contrasenaCoinciden } from '../../validadores/usuario.validators';
import { Auth } from '../../servicios/auth';
import { HttpErrorResponse } from '@angular/common/http';

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

  clave = new FormControl('', { validators: [Validators.required, contrasenaSegura()] });

  mensajeError = signal('');

  //Formulario de registro
  formRegistro = new FormGroup({
    nombre: new FormControl('',{ validators: [Validators.required, Validators.maxLength(30), Validators.minLength(2)]}),
    apellido: new FormControl('', {validators: [Validators.required, Validators.maxLength(30), Validators.minLength(2)]}),
    correo: new FormControl('',{ validators: [Validators.required, Validators.email]}),
    usuario: new FormControl('', {validators: [Validators.required, Validators.maxLength(20), Validators.minLength(2)]}),
    clave: this.clave,
    repetir: new FormControl('', {validators: [ Validators.required, contrasenaCoinciden(this.clave)]}),
    
    dia: new FormControl('',{ validators: [Validators.required]}),
    mes: new FormControl('',{ validators: [Validators.required]}),
    anio: new FormControl('',{ validators: [Validators.required]}),

    descripcion: new FormControl('', {validators: [Validators.required, Validators.maxLength(140)]})
  });

    //CONSTRUCTOR
    constructor(private router: Router, private auth: Auth){
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
      this.mensajeError.set('');

      if(this.formRegistro.invalid){
        this.formRegistro.markAllAsTouched();
        return;
      }

      let fechaNacimiento = this.armarFecha(this.formRegistro.value.dia!, this.formRegistro.value.mes!, this.formRegistro.value.anio!);

      this.auth.registro(
        this.formRegistro.value.nombre!,
        this.formRegistro.value.apellido!,
        this.formRegistro.value.correo!,
        this.formRegistro.value.usuario!,
        this.formRegistro.value.clave!,
        fechaNacimiento,
        this.formRegistro.value.descripcion!
      ).subscribe({
        next: (usuario)=> {
          this.router.navigate(['/login']);
        },
        error: (error) => this.mostrarError(error)
      });
    }

    elegirFoto(evento: any) {
        this.foto = evento.target.files[0];
        if (this.foto) {
          this.vistaPrevia = URL.createObjectURL(this.foto);
        }
    }
    

    //El back ESPERA: 1990-03-05
    armarFecha(dia: string, mes: string, anio: string) {
      if (dia.length === 1) {
        dia = '0' + dia;
      }
      if (mes.length === 1) {
        mes = '0' + mes;
      }
      return anio + '-' + mes + '-' + dia;
    }

    mostrarError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.mensajeError.set('No se pudo conectar con el servidor');
    } else if (error.status === 409) {
      this.mensajeError.set(error.error.message);
    } else if (error.status === 400) {
      this.mensajeError.set(error.error.message.join(', '));
    } else {
      this.mensajeError.set('No se pudo crear la cuenta, probá de nuevo');
    }
  }

  }



