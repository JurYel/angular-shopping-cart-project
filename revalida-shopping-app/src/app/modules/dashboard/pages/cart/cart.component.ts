import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.interface';
import { S3UploadService } from '../../services/s3-upload.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../admin/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  // Select All Flag
  selectAll: boolean = false;
  cartItems$: Observable<CartItem[]>;
  groceryCart: CartItem;
  customerUsername: string;
  checkoutForm: FormGroup;
  searchQuery : string = '';
  filteredItems: CartItem;

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
      selected: false,
    },
    // Add more items as needed
  ];

  constructor(
    private fb: FormBuilder,
    private awsS3Service: S3UploadService,
    private messageService: MessageService,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {
    this.customerUsername = sessionStorage.getItem('username') as string;
    this.cartItems$ = this.cartService.getCartItems(this.customerUsername);

    this.s3Folder = 'assets/items';
    this.groceryCart = {
      id: '',
      username: this.customerUsername,
      item_img: [] as string[],
      item_name: [] as string[],
      category: [] as string[],
      quantity: [] as number[],
      unit_price: [] as number[],
      subtotal: [] as number[],
    };
    this.filteredItems = this.groceryCart;

    this.checkoutForm = this.fb.group({
      quantities: this.fb.array([]),
    });

    this.cartItems$.subscribe((cart) => {
      this.groceryCart = cart[0];
      this.groceryCart.id = cart[0].id;
      this.filteredItems = this.groceryCart;
      console.log('grocery: ', this.groceryCart);

      cart[0].item_img.forEach(async (item_img) => {
        this.imageUrls.push(
          `${this.awsS3Service.cloudfrontDomain}/${this.s3Folder}/${item_img}`
        );
        // this.imageUrls.push(await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${item_img}`))
      });

      this.populateQuantities(cart[0].quantity);
    });

    // console.log(this.groceryCart);
    this.searchQuery = '';
    this.searchCart();
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
      this.quantities.push(
        this.fb.control(1, [Validators.required, Validators.min(1)])
      );
    });
  };


  searchCart = (): void => {
    if (this.searchQuery) {
     // Filter based on the searchQuery for both item_name and category
     this.cartService.getCartItems(this.customerUsername)
      .pipe(
        map((carts: CartItem[]) => {
          // Filter based on the searchQuery for both item_name and category
          return carts.map(cart => {
            const filteredIndices = cart.item_name
              .map((name, index) => (name.toLowerCase().includes(this.searchQuery.toLowerCase()) || cart.category[index].includes(this.searchQuery)) ? index : -1)
              .filter(index => index !== -1);

            // Update the groceryCart object with filtered values
            return {
              ...cart,
              item_img: filteredIndices.map(index => cart.item_img[index]),
              item_name: filteredIndices.map(index => cart.item_name[index]),
              category: filteredIndices.map(index => cart.category[index]),
              quantity: filteredIndices.map(index => cart.quantity[index]),
              unit_price: filteredIndices.map(index => cart.unit_price[index]),
              subtotal: filteredIndices.map(index => cart.subtotal[index])
            };
          });
        })
      ).subscribe(filteredCarts => {
        // Filter the cart
        console.log("filtered carts: ", filteredCarts);
        this.groceryCart = filteredCarts[0]; // Replace with the correct cart, if there are multiple carts
      });
    } else {
      this.cartService.getCartItems(this.customerUsername).subscribe(carts => {
        this.groceryCart = carts[0];
        this.groceryCart.id = carts[0].id;
      });
    }
  }

  retrieveCustomerCart = (username: string) => {
    this.cartService
      .getCartItems(username as string)
      .subscribe(async (response) => {
        if (response.length > 0) {
          this.groceryCart = response[0];
          this.groceryCart.id = response[0].id;

          // this.cartItemCount = response[0].quantity.length;
          console.log('grocery: ', this.groceryCart);

          response.forEach(async (item) => {
            this.imageUrls.push(
              await this.awsS3Service.getSignedUrl(
                `${this.s3Folder}/${item.item_img}`
              )
            );
          });

          for (let i = 0; i < response[0].quantity.length; i++) {
            this.quantities.at(i).setValue(response[0].quantity[i]);
          }
        }
      });
  };

  // Decrease quantity
  decreaseQuantity(index: number) {
    const control = this.quantities.at(index);
    if (control.value > 1) {
      control.setValue(control.value - 1);
      this.groceryCart.quantity[index] -= 1;
      this.groceryCart.subtotal[index] = control.value * this.groceryCart.unit_price[index];

      this.updateCustomerGroceryCart(this.groceryCart as CartItem, null, false);
    }
  }

  // Increase quantity
  increaseQuantity(index: number) {
    const control = this.quantities.at(index);
    if (control.value < this.groceryCart.quantity[index]) {
      control.setValue(control.value + 1);
    }
    this.productService
      .getProducts()
      .pipe(
        map((products) => {
          return products.filter((product) =>
            product.item_name.includes(this.groceryCart.item_name[index])
          );
        })
      )
      .subscribe((product) => {
        console.log(product);
        if (control.value < product[0].quantity) {
          control.setValue(control.value + 1);
          this.groceryCart.quantity[index] += 1;
          this.groceryCart.subtotal[index] = control.value * this.groceryCart.unit_price[index];

          this.updateCustomerGroceryCart(this.groceryCart as CartItem, null, false);
        }
      });
  }

  // Remove item from cart
  removeItem(index: number) {
    
    const removedItem = this.groceryCart.item_name[index];
    this.groceryCart.item_img.splice(index, 1);
    this.groceryCart.item_name.splice(index, 1);
    this.groceryCart.category.splice(index, 1);
    this.groceryCart.quantity.splice(index, 1);
    this.groceryCart.unit_price.splice(index, 1);
    this.groceryCart.subtotal.splice(index, 1);

    this.updateCustomerGroceryCart(this.groceryCart as CartItem, removedItem, true);
  }

  updateCustomerGroceryCart = (cart: CartItem, itemRemoved: string | null, notify: boolean = false) => {
    this.cartService.updateCustomerCart(this.groceryCart as CartItem).subscribe(
      response => {
        if(notify){
          this.messageService.add({ severity:'success', summary: 'Success', detail: `${itemRemoved} has been removed from your cart.` });
        }
      },
      error => {
        console.log("Failed to update cart item: ", error)
        if(notify) {
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed to remove cart item' });
        }
      }
    )
  }

  // Get total price of all items in the cart
  getTotal() {
    // return this.cartItems
    //   .filter(item => item.selected)
    //   .reduce((total, item) => total + item.price * item.quantity, 0);

    return this.groceryCart.subtotal.reduce(
      (total, subtotal) => total + subtotal,
      0
    );
  }

  onCheckout = () => {
    this.router.navigate(['/home/checkout']);
  };
}
