import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    patientList: Array<Patient> = [];

    constructor(public http: HttpClient) {}

    public findByEmployeeId(id: String) {
        const url = environment.API + '/patient/by-employee-id/' + id;
        return this.http.get(url).pipe(map((data: any) => {
            this.patientList = data;
            return data;
        }));
    }

    public findAll() {
        const url = environment.API + '/patient';
        return this.http.get(url).pipe(map((data: any) => {
            console.log('http response method', data);
            this.patientList = data;
        }));
    }

    public save(data: Patient) {
        const url = environment.API + '/patient';
        return this.http.post(url, data);
    }

    public update(user: Patient) {
        const url = environment.API + '/patient';
        return this.http.put(url, user);
    }

    public delete(id: String) {
        const url = environment.API + '/patient/' + id;
        return this.http.delete(url);
    }

}