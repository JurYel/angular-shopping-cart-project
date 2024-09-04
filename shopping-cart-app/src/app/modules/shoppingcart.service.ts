import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product){
    const existingProduct = this.cartItems.find(item => item.food_id === product.food_id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.cartItems.push(product);
    }
    this.cartSubject.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart(){
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
  constructor() { }

  checkout() {
    const order = this.cartItems;
    this.clearCart();
    return order;
  }
}
