import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.interface';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: ShoppingcartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }
  clearCart() {
    this.cartService.clearCart();
    }
  }

