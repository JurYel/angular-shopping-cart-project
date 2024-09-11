import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.interface';
import { S3UploadService } from '../../services/s3-upload.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  searchQuery: string = '';

  // Select All Flag
  selectAll: boolean = false;
  cartItems$: Observable<CartItem[]>;
  groceryCart: CartItem;
  customerUsername: string;
  checkoutForm: FormGroup;

  // s3 variables
  timestamp: number = Date.now();
  s3Folder: string;
  imageUrls: string[] = [];

  // Sample cart items data
  cartItems = [
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

  constructor(private fb: FormBuilder,
              private awsS3Service: S3UploadService,
              private messageService: MessageService,
              private cartService: CartService,
              private router: Router
  ) {
    this.customerUsername = sessionStorage.getItem('username') as string;
    this.cartItems$ = this.cartService.getCartItems(this.customerUsername);
    
    this.s3Folder = "assets/items";
    this.groceryCart  = {
      id: "",
      username: this.customerUsername,
      item_img: [] as string[],
      item_name: [] as string[],
      category: [] as string[],
      quantity: [] as number[],
      unit_price: [] as number[],
      subtotal: [] as number[]
    }

    this.checkoutForm = this.fb.group({
      quantities: this.fb.array([])
    });

    this.cartItems$.subscribe(
      (cart) => {
        this.groceryCart = cart[0];
        this.groceryCart.id = cart[0].id;
        console.log("grocery: ", this.groceryCart);

        cart[0].item_img.forEach(
          async (item_img) => {
            this.imageUrls.push(`${this.awsS3Service.cloudfrontDomain}/${this.s3Folder}/${item_img}`)
            // this.imageUrls.push(await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${item_img}`))
          }
        );

        this.populateQuantities(cart[0].quantity);
      }
    );
    
    // console.log(this.groceryCart);
  }

  ngOnInit(): void {
   
    this.retrieveCustomerCart(this.customerUsername as string);
  }

  get quantities(): FormArray {
    return this.checkoutForm.get('quantities') as FormArray;
  }

  populateQuantities = (items: number[]) => {
    items.forEach(() => {
      // Initialize quantities to 1
      this.quantities.push(this.fb.control(1, [Validators.required, Validators.min(1)]));
    });
  }

  retrieveCustomerCart = (username: string) => {
    this.cartService.getCartItems(username as string).subscribe(
      async (response) => {
        if(response.length > 0){
          this.groceryCart = response[0];
          this.groceryCart.id = response[0].id;

          // this.cartItemCount = response[0].quantity.length;
          console.log("grocery: ", this.groceryCart);
          
          response.forEach(
            async (item) => {

              this.imageUrls.push(await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${item.item_img}`));
            }
          )
        }
      }
    );
  } 

  // Toggle selection for all items
  toggleAllSelection() {
    this.cartItems.forEach(item => (item.selected = this.selectAll));
  }

  // Update the "Select All" checkbox state
  updateSelection() {
    this.selectAll = this.cartItems.every(item => item.selected);
  }

  // Decrease quantity
  decreaseQuantity(index: number) {
    const control = this.quantities.at(index);
    if(control.value > 1) {
      control.setValue(control.value - 1);
    }
  }

  // Increase quantity
  increaseQuantity(index: number) {
    const control = this.quantities.at(index);
    if(control.value < this.groceryCart.quantity[index]) {
      control.setValue(control.value + 1);
    }
  }

  // Remove item from cart
  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  // Get total price of all items in the cart
  getTotal() {
    // return this.cartItems
    //   .filter(item => item.selected)
    //   .reduce((total, item) => total + item.price * item.quantity, 0);

    return  this.groceryCart.subtotal.reduce((total, subtotal) => total + subtotal, 0);
  }

  onCheckout = () => {
    this.router.navigate(['/home/checkout']);
  }
}
