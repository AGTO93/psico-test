import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public _authService: AuthService, public router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err, caught) => {
            console.log('error', err);

            if (err.status === 0) {
                console.log('No hay conexión con el servidor');
                return throwError(() => err);
            }

            if (err.status === 400) {
                console.log('Algo salió mal, error 400 del servidor');
                return throwError(() => err);
            }

            if (err.status === 401 || err.status === 403) {
                console.log('Sesión caducada');
                this._authService.deleteLocalStorage();
                this.router.navigate(['/login']);
                return throwError(() => err);
            }

            if (err.status === 404) {
                console.log('Servicio no encontrado, error 404 del servidor');
                return throwError(() => err);
            }

            if (err.status >= 500) {
                console.log('Ocurrió un error en el servidor');
                return throwError(() => err);
            }

            return caught;
        }));
    }
}