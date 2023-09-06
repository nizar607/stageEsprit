import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

    // Get all formations
    public getUsers() {
      return this.httpClient.get<User[]>(`${this.SERVER_URL + '/users'}`, { responseType: "json" });
    }
  
    // Get Formation By id
    public login(email: string, password: string) {
      return this.httpClient.post<{User :any}>(`${this.SERVER_URL + '/login'}`,{email,password} ,{ responseType: "json" }); 
    }
  
    // Create Formation
    public createUser(offer: any){
      return this.httpClient.post<{message:any}>(`${this.SERVER_URL + '/users'}`, offer)
    }
  
    // Delete Formation
    public deleteUser(id: any){
      return this.httpClient.delete<{message : any}>(`${this.SERVER_URL + '/users'}/${id}`)
    }
  
    public updateUser(offer: any){
      return this.httpClient.put<{message : any}>(`${this.SERVER_URL + '/users'}/${offer._id}`, offer)
  }
}
