import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      /* if (err.status === 401) {
        // auto logout if 401 response returned from api
        alert('Adresse email ou de mot passe incorrect');
      } */
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
