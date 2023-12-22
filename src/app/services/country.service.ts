import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    countryList: Array<any> = [];

    constructor(public http: HttpClient) {}

    public findAll() {
        const url = environment.API + '/country';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('http response method', data);
            this.countryList = data;
        }));
    }
}