import { Component,signal} from '@angular/core';
import {  RouterLink, RouterOutlet,Router } from '@angular/router';
import { Auth } from '../servicios/auth';
import { Modal } from '../componentes/modal/modal';


@Component({
  imports: [RouterLink, RouterOutlet, Modal],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {


  //Constructor
  constructor(private router: Router, private auth: Auth) {}


  avisoSesion = signal(false);//muestra el modal 
  relojAviso: any;//el aviso 5 minutos antes de vencer
  relojVencer: any;//la salida cuando vence
  //Metodos
 
  ngOnInit() {
    this.programarReloj();
  }
  


  programarReloj() {
    clearTimeout(this.relojAviso);
    clearTimeout(this.relojVencer);

    const vence = this.auth.vencimientoToken();
    const ahora = Date.now();
    const faltaParaVencer = vence - ahora;
    const faltaParaAvisar = faltaParaVencer - 30000;

    this.relojAviso = setTimeout(() => {
      this.avisoSesion.set(true);
    }, faltaParaAvisar);

    this.relojVencer = setTimeout(() => {
      this.avisoSesion.set(false);
      this.salir();
    }, faltaParaVencer);
  }

//si extiendo, me da un token nuevo y programar reloj lo primero que hace es reiniciar
  extenderSesion() {
    this.auth.refrescar().subscribe((respuesta: any) => {
      this.auth.guardarToken(respuesta.token);
      this.avisoSesion.set(false);
      this.programarReloj();
    });
  }
  
  cancelarAviso() {
    this.avisoSesion.set(false);
  }
 //si me salgo del lagout qye es el contenedor de todo reincia relojes
  ngOnDestroy() {
    clearTimeout(this.relojAviso);
    clearTimeout(this.relojVencer);
  }


  //Cerrar sesion
  salir() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }

}
