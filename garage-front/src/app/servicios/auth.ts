//Se creo asi por defecto
/*import { Service } from '@angular/core';

@Service()
export class Auth {}*/


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({providedIn:'root'})

export class Auth {

    //Propiedades

    private http= inject(HttpClient);

    //Metodo
    login(correo:string, clave: string){
        return this.http.post(environment.apiUrl + '/auth/login', {correo:correo, clave:clave});
    }

      //Registro
    registro(nombre: string, apellido: string, correo: string, usuario: string, clave: string, fechaNacimiento: string, descripcion: string) {
        return this.http.post(environment.apiUrl + '/auth/registro', {
        nombre:nombre,
        apellido:apellido,
        correo:correo,
        usuario:usuario,
        clave:clave,
        fechaNacimiento:fechaNacimiento,
        descripcion:descripcion
        });
    }

    //capturo el usuario y parceo a texto
    guardarUsuario(usuario: any) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    //aca lo devuelvo cuando la pagina necesita saber quien es, lo parseo
    usuarioActual() {
        const texto = localStorage.getItem('usuario');
        if (texto) {
        return JSON.parse(texto);
        }
        return null;
    }
    
    cerrarSesion() {
        localStorage.removeItem('usuario');
    }

}