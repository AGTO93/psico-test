import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VersionService {

    fullVersion: any = {};

    constructor(public http: HttpClient) {}

    public findAll() {
        const url = environment.API + '/user';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('findAll method return', data);
            return data;
        }));
    }

    public findFullById(id: String) {
        const url = environment.API + '/version/full-by-id/' + id;
        return this.http.get(url).pipe(map((data: any) => {
            console.log('data', data);
            this.fullVersion = data;
            return data;
        }));
    }
}