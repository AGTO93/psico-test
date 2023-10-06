import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
    constructor(public _authService: AuthService, public router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        this._authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
