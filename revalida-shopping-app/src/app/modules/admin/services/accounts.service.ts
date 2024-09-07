import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { AuthUser } from '../../models/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAccounts = (): Observable<AuthUser[]> => {
    return this.http.get<AuthUser[]>(`${this.serverUrl}/users`).pipe(
      map(users => users.filter(user => !user.is_admin)));
  }

  getUserIdByUsername = (username: string): Observable<AuthUser[]> => {
    return this.http.get<AuthUser[]>(`${this.serverUrl}/users?username=${username}`);
  }

  checkIfUsernameExists = (username: string): Observable<boolean> => {
    const users$: Observable<AuthUser[]> = this.getAccounts();

    return users$.pipe(
      map(users => users.some(user => user.username.toLowerCase() === username.toLowerCase()))
    );
  }

  addUser = (user: AuthUser) => {
    return this.http.post<AuthUser>(`${this.serverUrl}/users`, user);
  }

  updateUser = (user: AuthUser) => {
    return this.http.put<AuthUser>(`${this.serverUrl}/users/${user.id}`, user);
  }

  deactivateUser = (user: AuthUser) => {
    return this.http.put<AuthUser>(`${this.serverUrl}/users/${user.id}`, user);
  }
}
