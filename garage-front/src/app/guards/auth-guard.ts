import { CanActivateFn,Router} from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Auth } from '../servicios/auth';


export const authGuard: CanActivateFn = (route, state) => {

  const auth=inject(Auth);
  const router = inject(Router);

  const usuario = auth.usuarioActual(); 

  if(usuario){
     return true;
  }

  return router.createUrlTree(['/login'])
 
};
