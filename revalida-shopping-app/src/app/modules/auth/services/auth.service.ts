import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getUserByUsername = (username: string): Observable<AuthUser[]> => {
    return this.http.get<AuthUser[]>(`${this.serverUrl}/users?username=${username}`);
  }
}
