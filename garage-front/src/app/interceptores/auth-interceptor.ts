import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //le pego el toquen a la req
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({setHeaders:{Authorization:`Bearer ${token}`}});
  }

  return next(req);
};
