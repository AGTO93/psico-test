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
    userData: any = {};
    employeeData: any = {};
    role: String = '';

    constructor(public http: HttpClient, public router: Router) { }

    isAuthenticated() {
        this.getLocalStorage();
        console.log('accessToken', this.accessToken ? true : false);
        return (this.accessToken) ? true : false;
    }

    getLocalStorage() {
        if (localStorage.getItem('access_token_psico_test')) {
            this.accessToken = localStorage.getItem('access_token_psico_test') ?? '';
        }
        if (localStorage.getItem('user_data_psico_test')) {
            this.userData = localStorage.getItem('user_data_psico_test') ?? {};
        }
        if (localStorage.getItem('employee_data_psico_test')) {
            this.employeeData = localStorage.getItem('employee_data_psico_test') ?? {};
        }
    }

    saveLocalStorage(accessToken: string, user: any, employee: any) {
        console.log('accessToken', accessToken);
        console.log('user', user);
        console.log('employee', employee);
        localStorage.setItem('access_token_psico_test', accessToken);
        localStorage.setItem('user_data_psico_test', JSON.stringify(user));
        localStorage.setItem('employee_data_psico_test', JSON.stringify(employee));
        this.accessToken = accessToken;
        this.userData = user;
        this.employeeData = employee;
    }

    deleteLocalStorage() {
        this.accessToken = '';
        this.userData = {};
        this.employeeData = {};
        localStorage.removeItem('access_token_psico_test');
        localStorage.removeItem('user_data_psico_test');
        localStorage.removeItem('employee_data_psico_test');
    }

    public login(username: string, password: string) {
        const url = environment.API_AUTH + '/login';
        return this.http.post(url, { 'username': username, 'password': password }).pipe(map((resp: any) => {
            this.saveLocalStorage(resp.token, resp.user, resp.employee);
            this.router.navigate(['/home']);
            return true;
        }));
    }

    /* public checkTocken() {
        const url = environment.API_AUTH + '/validate-token';
        return this.http.get(url).pipe(map((resp: any) => {
            console.log('active token', resp.active);
            this.activeToken = resp.active;
        }));
    } */

    public logout() {
        this.deleteLocalStorage();
    }
}