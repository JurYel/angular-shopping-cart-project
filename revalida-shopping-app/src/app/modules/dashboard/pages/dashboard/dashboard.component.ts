import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../admin/services/products.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../admin/services/order.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../models/cart-item.interface';
import { S3UploadService } from '../../services/s3-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  products$: Observable<Product[]>;
  productBundle!: Product;
  productBundleIndex!: number;
  addToCartForm: FormGroup;
  cartItemCount: number;
  customerUsername: string;
  groceryCart: any;
  s3Folder: string;
  imageUrls: string[] = [];
  itemImageName: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private productService: ProductsService,
              private cartService: CartService,
              private awsS3Service: S3UploadService
  ) {
    this.products$ = this.productService.getProducts().pipe(
      // map(products => products.filter(product => !product.item_name.includes("Bundle")))
    );


    this.productService.getProducts().pipe(
      map(products => products.filter(product => product.item_name.includes("Bundle")))
    ).subscribe(
      product => {
       if(product) {
        this.productBundle = product[0];
       }
      }
    );
    
    this.addToCartForm = this.fb.group({
      // quantity: [1, [Validators.required, Validators.min(1)]]
      quantities: this.fb.array([])
    });

    this.products$.subscribe(
      products => {
        this.populateQuantities(products);
      }
    );

    console.log(this.quantities);

    this.customerUsername = sessionStorage.getItem('username') as string;
    this.groceryCart  = {
      username: sessionStorage.getItem('username') as string,
      item_img: [] as string[],
      item_name: [] as string[],
      quantity: [] as number[],
      unit_price: [] as number[],
      subtotal: [] as number[]
    }
    this.cartItemCount = 0;
    this.getProductBundleIndex();

    // S3 variables
    this.s3Folder = "assets/items";
    // this.imageUrls = `${this.s3Folder}/default_item_img.jpg`;
    this.itemImageName = `assets/img/default_item_img.jpg`;
    this.products$.subscribe(
      products => {
        products.forEach(
          async (product) =>
          this.imageUrls.push(await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${product.item_img}`))
        )
      }
    );
  }

  ngOnInit(): void {
      
    // const cartItems$: Observable<CartItem> = this.cartService.getCartItems(this.customerUsername as string);
    // cartItems$.pipe(
    //   map(items => {
    //     this.cartItemCount = items.item_name.length
    //   })
    // ).subscribe();

    // this.cartService.getCartItems(this.customerUsername as string).subscribe(
    //   response => {
    //     if(response.length > 0){
    //       this.groceryCart = response[0];
    //       this.cartItemCount = response[0].quantity.length;
    //       console.log("grocery: ", this.groceryCart);
    //     }
    //   }
    // );
    this.retrieveCustomerCart(this.customerUsername as string);
  }

  get quantities(): FormArray {
    return this.addToCartForm.get('quantities') as FormArray;
  }

  // Populate the FormArray with FormControl for each product
  populateQuantities = (products: Product[]) => {
    products.forEach(() => {
      // Initialize quantities to 1
      this.quantities.push(this.fb.control(1, [Validators.required, Validators.min(1)])); 
    });
  }

  retrieveCustomerCart = (username: string) => {
    this.cartService.getCartItems(username as string).subscribe(
      async (response) => {
        if(response.length > 0){
          this.groceryCart = response[0];
          this.cartItemCount = response[0].quantity.length;
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

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  getProductBundleIndex = () => {

    this.productService.getProducts().pipe(
      map(products => {
        const index = products.findIndex(product => product.item_name.includes('Bundle'));
        console.log("bundle: ", index);
        if(index === -1){
          console.log("Error getting index: No product with such name");
        } else {
          this.productBundleIndex = index;
        }
      })
    ).subscribe();
  }

  // Increase quantity
  stepUp = (index: number) => {
    const control = this.quantities.at(index);
    this.products$.pipe(
      map(products => products[index])
    ).subscribe(
      product => {
        if(control.value < product.quantity) {
          control.setValue(control.value + 1);
        }
      }
    )
  }

  stepDown = (index: number) => {
    const control = this.quantities.at(index);
    if(control.value > 1) {
      control.setValue(control.value - 1)
    }
  }

  addToCart = (index: number) => {
    

    if(parseInt(this.quantities.at(index).value)) {
      this.products$.pipe(
        map(products => products[index])
      ).subscribe(
        response => {
          const quantityInput = parseInt(this.quantities.at(index).value);
          console.log("quantity input: ", quantityInput)
          // const itemIndex = this.groceryCart?.item_name.findIndex((item: string) => item.includes(response.item_name));
          
          // Check if customer/user has previously ordered
          if(this.groceryCart.id){
            // If so, check if such item added is already in his cart
            const itemIndex = this.groceryCart.item_name.indexOf(response.item_name);
            console.log(itemIndex);
            
            // If yes, just increment the quantity and update the subtotal amount of the order
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
            } 
            // If not exists, push the new item to the customer's cart
            else {
              console.log("inside here: ", itemIndex);
              this.groceryCart.item_img.push(response.item_img);
              this.groceryCart.item_name.push(response.item_name);
              this.groceryCart.quantity.push(quantityInput);
              this.groceryCart.unit_price.push(response.unit_price);
              this.groceryCart.subtotal.push(quantityInput * response.unit_price);

              this.cartService.updateCustomerCart(this.groceryCart as CartItem).subscribe(
                response => {
                  console.log("Updated customer cart: ", response)
                },
                error => {
                  console.error("Error updating customer cart: ", error);
                }
              )
            }
          } // If user has no cart or no previous orders, create a new cart with the added item inside
            else {
            
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

            this.retrieveCustomerCart(this.customerUsername);
          }
          

          this.cartItemCount = this.groceryCart.quantity.length;
          this.addToCartForm.reset();
          this.quantities.at(index).setValue(1)
        }
      );
    }
  }
}
