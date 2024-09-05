import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>(`${this.serverUrl}/inventory`);
  }
}
