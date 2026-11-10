import { Component, signal} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contrasenaSegura } from '../../validadores/usuario.validators';

import { Auth } from '../../servicios/auth';


@Component({
  imports: [RouterLink,ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  //Constructor
  constructor(private router: Router, private auth: Auth) {}
  //Propiedades
  mensajeError = signal('');
  
  //Formulario de logn
  formLogin = new FormGroup({
    correo: new FormControl('',{ validators: [Validators.required, Validators.email]}),
    clave: new FormControl('', {validators: [Validators.required, contrasenaSegura()]})
  });


  ///Metodos
  
  //Ingresar
  ingresar (){
    this.mensajeError.set('');

    if(this.formLogin.invalid)
    {
      this.formLogin.markAllAsTouched();
      if (this.formLogin.controls.clave.hasError('contrasenaSegura')) {
        this.mensajeError.set('Correo o contraseña incorrectos');
      }
      return;
    }
    //console.log(this.formLogin.value);
    this.auth.login(this.formLogin.value.correo!, this.formLogin.value.clave!).subscribe({
      next: (usuario)=> {
        this.router.navigate(['/garage/perfil']);
      },
      error: (error)=> {
        if (error.status === 401){
          this.mensajeError.set('Correo o contraseña incorrectos');
        }else{
          this.mensajeError.set('No se pudo conectar con el servidor');
        }
      }
    });
  }
}
