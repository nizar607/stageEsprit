import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CandidatureService {
    SERVER_URL: string = "http://localhost:3000"; 

    constructor(private http: HttpClient) { }

    public uploadResume(formData: any): any {
        return this.http.post(`${this.SERVER_URL}/resume` , formData);
    }

    public addCandidature(candidature: any): any {
        return this.http.post(`${this.SERVER_URL}/candidature` , candidature);
    }
}