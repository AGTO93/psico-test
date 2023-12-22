import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer.model';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {

    answer: Answer = {};

    constructor(public http: HttpClient) {}

    public save(answer: Answer) {
        const url = environment.API + '/answer';
        return this.http.post(url, answer);
    }

    public findById(id: String) {
        const url = environment.API + '/answer/by-id/' + id;
        return this.http.get(url).pipe(map((data: any) => {
            console.log('http response method', data);
            this.answer = data;
        }));
    }

}