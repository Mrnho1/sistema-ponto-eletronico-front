import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {

      if (error.status === 401) {
        console.error('Não autenticado, limpando sessão');

        localStorage.removeItem('token');

        // opcional: redirecionar
        window.location.href = '/login';
      }

      return throwError(() => error);
    })
  );
};