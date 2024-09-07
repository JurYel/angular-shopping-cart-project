import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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

  getProductIdByName = (name: string): Observable<Product[]> => {
    return this.http.get<Product[]>(`${this.serverUrl}/inventory?item_name=${name}`);
  }

  checkIfProductExists = (name: string): Observable<boolean> => {
    const products$: Observable<Product[]> = this.getProducts();

    return products$.pipe(
      map(products => products.some(product => product.item_name.toLowerCase() === name.toLowerCase()))
    );
  }

  addProduct = (product: Product) => {
    return this.http.post<Product>(`${this.serverUrl}/inventory`, product);
  }

  updateProduct = (product: Product) => {
    return this.http.put<Product>(`${this.serverUrl}/inventory/${product.id}`, product).pipe(
      tap(prod => console.log("Updating item: ", prod))
    );
  }

  deleteProduct = (id: string) => {
    return this.http.delete<Product>(`${this.serverUrl}/inventory/${id}`);
  }

 
}
