import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingcartService } from 'src/app/modules/shoppingcart.service';

@Component({
  selector: 'shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
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

