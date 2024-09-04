import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingcartService } from 'src/app/modules/shoppingcart.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent {
  products: Product[] = [
    {food_id: 1, food_name: 'Piattos', price: 25, quantity: 1},
    {food_id: 2, food_name: 'Zest-O', price: 7, quantity: 1}
  ];
  
  constructor(private cartService: ShoppingcartService){}

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }

}
