import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../servicios/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(Auth);

  //le pego el toquen a la req
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({setHeaders:{Authorization:`Bearer ${token}`}});
  }
  //const respuesta = 

  //le enchufo la revision para la vuelta
 return next(req).pipe( //observable
    catchError((error) => {
      if (error.status === 401) {
        auth.cerrarSesion();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );

  //return respuestaRevisada;
};
