import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userList: Array<User> = [];
    user: User = {};

    constructor(public http: HttpClient) {}

    public findAll() {
        const url = environment.API + '/user';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('findAll method return', data);
            this.userList = data.users;
        }));
    }

    public save(user: User) {
        const url = environment.API + '/user';
        return this.http.post(url, user);
    }

    public update(user: User) {
        const url = environment.API + '/user';
        return this.http.put(url, user);
    }

    public delete(id: String) {
        const url = environment.API + '/user/' + id;
        return this.http.delete(url);
    }
}