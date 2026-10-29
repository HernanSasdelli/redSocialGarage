import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contrasenaSegura } from '../../validadores/usuario.validators';


@Component({
  imports: [RouterLink,ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  //Constructor
  constructor(private router: Router) {}
  //Propiedades

  //Formulario de registro
  formLogin = new FormGroup({
    usuario: new FormControl('',{ validators: [Validators.required]}),
    contrasena: new FormControl('', {validators: [Validators.required, contrasenaSegura()]})
  });


  //Metodos

  //Ingresar
  ingresar (){
    if(this.formLogin.invalid)
    {
      this.formLogin.markAllAsTouched();
      return;
    }
    //console.log(this.formLogin.value);
    this.router.navigate(['/garage/perfil']);
  }
}
