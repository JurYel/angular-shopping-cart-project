import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../admin/services/products.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../admin/services/order.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cart-item.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products$: Observable<Product[]>;
  addToCartForm: FormGroup;
  cartItemCount: number;
  customerUsername: string;
  groceryCart: CartItem;
  constructor(private router: Router,
              private fb: FormBuilder,
              private productService: ProductsService,
              private cartService: CartService
  ) {
    this.products$ = this.productService.getProducts();
    this.addToCartForm = this.fb.group({
      "quantity": [1, [Validators.required, Validators.min(1)]]
    });

    this.customerUsername = sessionStorage.getItem('username') as string;
    this.groceryCart  = {
      id: "",
      username: sessionStorage.getItem('username') as string,
      item_img: [] as string[],
      item_name: [] as string[],
      quantity: [] as number[],
      unit_price: [] as number[],
      subtotal: [] as number[]
    }
    this.cartItemCount = 0;
  }

  ngOnInit(): void {
      
    // const cartItems$: Observable<CartItem> = this.cartService.getCartItems(this.customerUsername as string);
    // cartItems$.pipe(
    //   map(items => {
    //     this.cartItemCount = items.item_name.length
    //   })
    // ).subscribe();

    this.cartService.getCartItems(this.customerUsername as string).subscribe(
      response => {
        if(response.length > 0){
          this.groceryCart = response[0];
          this.cartItemCount = response[0].quantity.length;
          console.log("grocery: ", this.groceryCart);
        }
      }
    );
  }

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  stepUp = (index: number) => {
    const numberInput = document.getElementById(index.toString()) as HTMLInputElement;
    this.products$.pipe(
      map(products => products[index])
    ).subscribe(
      product => {
        if(parseInt(numberInput.value) < product.quantity){
          numberInput.stepUp(); 
        }
      }
    );
  }

  stepDown = (index: number) => {
    const numberInput = document.getElementById(index.toString()) as HTMLInputElement;
    if(parseInt(numberInput.value) > 1){
      numberInput.stepDown(); 
    }
  }

  addToCart = (index: number) => {
    const quantityInput = parseInt(this.addToCartForm.get('quantity')?.value);

    if(parseInt(this.addToCartForm.get('quantity')?.value) > 0) {
      this.products$.pipe(
        map(products => products[index])
      ).subscribe(
        response => {
          // const itemIndex = this.groceryCart?.item_name.findIndex((item: string) => item.includes(response.item_name));
          const itemIndex = this.groceryCart.item_name.indexOf(response.item_name);
          console.log(itemIndex);
          
          if(itemIndex !== -1){
            // const itemIndex = this.groceryCart?.item_name.findIndex((item: string) => item === response.item_name);
            this.groceryCart.quantity[itemIndex] += quantityInput;
            this.groceryCart.subtotal[itemIndex] = this.groceryCart.quantity[itemIndex] * this.groceryCart.unit_price[itemIndex];

            this.cartService.updateCustomerCart(this.groceryCart as CartItem).subscribe(
              response => {
                console.log("Updated customer cart: ", response)
              },
              error => {
                console.error("Error updating customer cart: ", error);
              }
            )
          } else {
            console.log("inside here: ", itemIndex);
            this.groceryCart.username = this.customerUsername;
            this.groceryCart.item_img.push(response.item_img);
            this.groceryCart.item_name.push(response.item_name);
            this.groceryCart.quantity.push(quantityInput);
            this.groceryCart.unit_price.push(response.unit_price);
            this.groceryCart.subtotal.push(quantityInput * response.unit_price);

            this.cartService.addCartItem(this.groceryCart as CartItem).subscribe(
              response => {
                console.log("Added cart item: ", response)
              },
              error => {
                console.log("Error adding to cart: ", error)
              }
            );
          }

          this.cartItemCount = this.groceryCart.quantity.length;
          this.addToCartForm.reset();
          this.addToCartForm.patchValue({ quantity: 1 });
        }
      );
    }
  }
}
