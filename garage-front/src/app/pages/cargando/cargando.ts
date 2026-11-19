import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';


@Component({
  imports: [],
  selector: 'app-cargando',
  styleUrl: './cargando.css',
  templateUrl: './cargando.html',
})
export class Cargando {
 //constructor(private router: Router, private auth: Auth) {}
  private auth = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.validarSesion();
    }, 13000);
  }

  //si no hay token al login, si hay le pregunto al back
  validarSesion() {
    const token = this.auth.tokenActual();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.auth.autorizar().subscribe({
      next: () => {
        this.router.navigate(['/garage/publicaciones']);
      },
      error: () => {
        this.auth.cerrarSesion();
        this.router.navigate(['/login']);
      }
    });
  }
}
  

  



