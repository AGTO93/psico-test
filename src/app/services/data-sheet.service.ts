import { Injectable } from '@angular/core';
import { DataSheet } from '../models/data-sheet.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataSheetService {

    dataSheetList: Array<DataSheet> = [];

    constructor(public http: HttpClient) {}

    public findByEmployeeId(id: String) {
        const url = environment.API + '/data-sheet/by-employee-id/' + id;
        return this.http.get(url).pipe(map((data: any) => {
            this.dataSheetList = data;
            return data;
        }));
    }

    public findAll() {
        const url = environment.API + '/data-sheet';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('http response method', data);
            this.dataSheetList = data;
        }));
    }

    public save(data: DataSheet) {
        const url = environment.API + '/data-sheet';
        return this.http.post(url, data);
    }

    public update(user: DataSheet) {
        const url = environment.API + '/data-sheet';
        return this.http.put(url, user);
    }

    public delete(id: String) {
        const url = environment.API + '/data-sheet/' + id;
        return this.http.delete(url);
    }
}