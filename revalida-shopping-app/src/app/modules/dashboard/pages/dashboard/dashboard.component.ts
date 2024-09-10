import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.interface';
import { ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  

  constructor(private router: Router, private cartService: ShoppingcartService,) {}

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }
    
  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

}
