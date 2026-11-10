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
}