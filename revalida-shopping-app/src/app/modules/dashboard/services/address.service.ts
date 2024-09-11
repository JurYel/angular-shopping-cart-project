import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../models/address.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private serverUrl = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  checkIfUserAddressExists = (username: string): Observable<boolean> => {
    const addresses$: Observable<Address[]> = this.getAddresses();

    return addresses$.pipe(
      map(addresses => 
        addresses.some(address => address.username.toLowerCase() === username.toLowerCase()))
    )
  }

  getAddresses = (): Observable<Address[]> => {
    return this.http.get<Address[]>(`${this.serverUrl}/addresses`);
  }

  addUserAddress = (address: Address) => {
    return this.http.post<Address>(`${this.serverUrl}/addresses`, address);
  }

  getAddressByUsername = (username: string): Observable<Address[]> => {
    return this.http.get<Address[]>(`${this.serverUrl}/addresses?username=${username}`);
  }

  updateUserAddress = (address: Address) => {
    return this.http.put<Address>(`${this.serverUrl}/addresses/${address.id}`, address);
  }
}
