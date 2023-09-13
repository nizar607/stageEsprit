import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../pages/user-form/user-form.component';

import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  // Get all formations
  public getUserProfiles() {
    return this.httpClient.get<UserProfile[]>(`${this.SERVER_URL + '/userProfile'}`, { responseType: "json" });
  }


  // Get Formation By id
  public getUserProfile(id: any) {
    return this.httpClient.get<{ formation: any }>(`http://localhost:3000/userProfile?id=${id}`, { responseType: "json" });
  }

  fetchFile(fileUrl: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' }); // Adjust the content type as needed
    return this.httpClient.get(fileUrl, { responseType: 'blob', headers });

  }

  // Create Formation
  public createUserProfile(userProfile: any) {
    return this.httpClient.post<{ message: any }>(`${this.SERVER_URL + '/userProfile'}`, userProfile)
  }

  // Delete Formation
  public deleteUserProfile(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.SERVER_URL + '/userProfile'}/${id}`)
  }

  public updateUserProfile(userProfile: any) {
    return this.httpClient.put<{ message: any }>(`${this.SERVER_URL + '/userProfile'}/${userProfile._id}`, userProfile)
  }
}
