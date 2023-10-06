import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(public _authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this._authService.accessToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._authService.accessToken}`
                }
            });
        }
        return next.handle(req);
    }
}