import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    employeeList: Array<Employee> = [];
    employee: Employee = {};

    constructor(public http: HttpClient) {}

    public findAll() {
        const url = environment.API + '/employee';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('http response method', data);
            this.employeeList = data;
        }));
    }

    public save(data: Employee) {
        const url = environment.API + '/employee';
        return this.http.post(url, data);
    }

    public update(user: Employee) {
        const url = environment.API + '/employee';
        return this.http.put(url, user);
    }

    public delete(id: String) {
        const url = environment.API + '/employee/' + id;
        return this.http.delete(url);
    }

}