import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(public _authService: AuthService, public router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isAuthenticated()) {
            console.log('Usuario autenticado. Pasó por el LoginGuard');
            return true;
        }

        console.log('Bloqueado por el LoginGuard');
        this.router.navigate(['/login']);
        return false;
    }
}
