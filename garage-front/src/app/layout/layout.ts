import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet,Router } from '@angular/router';
import { Auth } from '../servicios/auth';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {


  //Constructor
  constructor(private router: Router, private auth: Auth) {}

  //Metodos

  //Cerrar sesion
  salir() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
