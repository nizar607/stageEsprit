import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;
  public connetedUser!: User | null;


  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  // Get all formations
  public getUsers() {
    return this.httpClient.get<User[]>(`${this.SERVER_URL + '/users'}`, { responseType: "json" });
  }

  // login
  public login(email: string, password: string) {
    return this.httpClient.post<User>(`${this.SERVER_URL + '/login'}`, { email, password }, { responseType: "json" })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.connetedUser = user;
        return user;
      }));;
  }

  // Create user
  public register(user: any) {
    console.log("user created")
    return this.httpClient.post<{ message: any }>(`${this.SERVER_URL + '/register'}`, user)
  }

  // Delete Formation
  public deleteUser(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.SERVER_URL + '/users'}/${id}`)
  }

  public updateUser(user: any) {
    return this.httpClient.put<{ message: any }>(`${this.SERVER_URL + '/users'}/${user._id}`, user)
  }
}
