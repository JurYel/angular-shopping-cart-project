import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../models/cart-item.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverUrl = environment.SERVER_URL
  constructor(private http: HttpClient) { }

  getCartIdByUsername = (username: string): Observable<CartItem> => {
    return this.http.get<CartItem>(`${this.serverUrl}/cart_items?username=${username}`);
  }

  addCartItem = (cartItem: CartItem) => {
    return this.http.post<CartItem>(`${this.serverUrl}/cart_items`, cartItem);
  }

  updateCustomerCart = (cartItem: CartItem) => {
    return this.http.put<CartItem>(`${this.serverUrl}/cart_items/${cartItem.id}`, cartItem);
  }

  getCartItems = (username: string): Observable<CartItem[]> => {
    return this.http.get<CartItem[]>(`${this.serverUrl}/cart_items?username=${username}`);
  }

  removeCartItems = (id: string): Observable<CartItem> => {
    return this.http.delete<CartItem>(`${this.serverUrl}/cart_items/${id}`);
  }
}
