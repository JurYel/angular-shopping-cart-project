import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  searchQuery: string = '';

  // Select All Flag
  selectAll: boolean = false;

  // Sample cart items data
  cartItems = [
    {
      name: 'Berocca 30 Tablets Orange Energy Multivitamins',
      variation: '30, Orange',
      price: 469,
      quantity: 1,
      image: 'assets/img/oreo-ice-cream-450ml.png', // Replace with the correct image path
      selected: false
    },
    {
      name: 'Berocca 30 Tablets Orange Energy Multivitamins',
      variation: '30, Orange',
      price: 469,
      quantity: 1,
      image: 'assets/img/oreo-ice-cream-450ml.png', // Replace with the correct image path
      selected: false
    },
    {
      name: 'Berocca 30 Tablets Orange Energy Multivitamins',
      variation: '30, Orange',
      price: 469,
      quantity: 1,
      image: 'assets/img/oreo-ice-cream-450ml.png', // Replace with the correct image path
      selected: false
    },
    {
      name: 'Berocca 30 Tablets Orange Energy Multivitamins',
      variation: '30, Orange',
      price: 469,
      quantity: 1,
      image: 'assets/img/oreo-ice-cream-450ml.png', // Replace with the correct image path
      selected: false
    }
    // Add more items as needed
  ];

  // Toggle selection for all items
  toggleAllSelection() {
    this.cartItems.forEach(item => (item.selected = this.selectAll));
  }

  // Update the "Select All" checkbox state
  updateSelection() {
    this.selectAll = this.cartItems.every(item => item.selected);
  }

  // Decrease quantity
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Increase quantity
  increaseQuantity(item: any) {
    item.quantity++;
  }

  // Remove item from cart
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  // Get total price of all items in the cart
  getTotal() {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
