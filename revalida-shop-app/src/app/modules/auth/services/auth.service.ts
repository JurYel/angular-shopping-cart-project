import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthUser } from '../../models/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  registerUser = (userDetails: AuthUser) => {
    return this.http.post(`${this.serverUrl}/users`, userDetails)
  } 

  
  getUsers = (): Observable<AuthUser[]> => {

    return this.http.get<AuthUser[]>(`${this.serverUrl}/users`);
  }

  // Getting ERROR TypeError: Failed to fetch dynamically imported module:
  checkIfUsernameExists = (username: string): Observable<boolean> => {
    const users$: Observable<AuthUser[]> = this.getUsers();

    return users$.pipe(
      map(users => users.some(user => user.username === username))
    );
  }

  getUserByUsername = (username: string): Observable<AuthUser[]> => {
    return this.http.get<AuthUser[]>(`${this.serverUrl}/users?username=${username}`);
  }

  // Getting ERROR TypeError: Failed to fetch dynamically imported module:
  updateUser = (user: AuthUser) => {
    return this.http.put<AuthUser>(`${this.serverUrl}/users/${user.id}`, user);
  }
}
