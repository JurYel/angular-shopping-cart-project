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

  addCartItem = (cartItem: CartItem) => {
    return this.http.post<CartItem>(`${this.serverUrl}/cart_items`, cartItem);
  }

  getCartItems = (username: string): Observable<CartItem> => {
    return this.http.get<CartItem>(`${this.serverUrl}/cart_items?username=${username}`);
  }
}
