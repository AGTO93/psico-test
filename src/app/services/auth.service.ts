import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    accessToken: string = '';

    constructor(public http: HttpClient, public router: Router) {}

    isAuthenticated() {
        this.getLocalStorage();
        console.log('accessToken', this.accessToken ? true : false);
        return (this.accessToken) ? true : false;
    }

    getLocalStorage() {
        if (localStorage.getItem('access_token_psico_test')) {
            this.accessToken = localStorage.getItem('access_token_psico_test') ?? '';
        }
    }

    saveLocalStorage(accessToken: string) {
        localStorage.setItem('access_token_psico_test', accessToken);
        this.accessToken = accessToken;
    }

    deleteLocalStorage() {
        this.accessToken = '';
        localStorage.removeItem('access_token_psico_test');
    }

    public login(username: string, password: string) {
        const url = environment.API_AUTH + '/login';
        // const body = new HttpParams().set('username', username).set('password', password);
        return this.http.post(url, {'username': username, 'password': password}).pipe(map((resp: any) => {
            this.saveLocalStorage(resp.token);
            this.router.navigate(['/home']);
            return true;
        }));
    }

    public logout() {
        this.deleteLocalStorage();
    }
}