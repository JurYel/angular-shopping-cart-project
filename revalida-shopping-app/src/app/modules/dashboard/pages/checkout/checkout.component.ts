import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../admin/services/order.service';
import { Order } from '../../../models/order.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AddressService } from '../../services/address.service';
import { Address } from '../../../models/address.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  @ViewChild('openReceiptModal') openReceiptModal !: ElementRef;
  @ViewChild('closeReceiptModal') closeReceiptModal !: ElementRef;

  customerOrder: Order;
  submitted: boolean = false;
  customerUsername: string;
  customerEmail: string = '';
  customerFirstName: string;
  customerLastName: string;
  customerMobileNum: string = '';
  checkoutForm: FormGroup;
  addressForm: FormGroup;
  paymentMethods: string[] = [];
  paymentMethod: string;
  badgeStyle: any;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private orderService: OrderService,
              private authService: AuthService,
              private addService: AddressService,
              private cartService: CartService,
              private router: Router
  ) {
    this.customerUsername = sessionStorage.getItem('username') as string;
    this.customerFirstName = sessionStorage.getItem('first_name') as string;
    this.customerLastName = sessionStorage.getItem('last_name') as  string;
    
    this.authService.getUserByUsername(this.customerUsername).subscribe(
      user => {
        if(user.length > 0) {
          this.customerEmail = user[0].email;
          this.customerMobileNum = user[0].mobile_num;
        }
      }
    );
    
    this.customerOrder = {
      id: '',
      username: this.customerUsername,
      customer_img: '',
      customer: '',
      location: '',
      datetime: 0,
      item_name: [] as string[],
      category: [] as string[],
      payment_mode: '',
      quantity: [] as number[],
      subtotal: [] as number[],
      status: ''
    }

    this.orderService.getTempOrder(this.customerUsername).subscribe(
      order => {
        this.customerOrder = order[0];
      }
    );
    
    this.checkoutForm = this.fb.group({
      paymentMethod: ['Select payment method', Validators.required]
    });

    this.addressForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_num: ['', [Validators.required, Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zip_code: ['', Validators.required],
      agree: [false, Validators.required]
    });


    this.paymentMethod = 'Select payment method';
    this.paymentMethods = [
      "Cash on Delivery",
      "Gcash",
      "PayMaya",
      "Credit Card"
    ]

    this.badgeStyle = {
      Delivered: 'success',
      Pending: 'warning',
      Shipped: 'info',
      Cancelled: 'danger',
    };

  }



  ngOnInit(): void {
      this.authService.getUserByUsername(this.customerUsername).subscribe(
        user => {
          if(user.length > 0) {
            this.customerEmail = user[0].email;
            this.customerMobileNum = user[0].mobile_num;

            this.addressForm.patchValue({
              first_name: user[0].first_name,
              last_name: user[0].last_name,
              email: user[0].email,
              mobile_num: user[0].mobile_num
            });
          }
        }
      );

      // this.addressForm.patchValue({
      //   first_name: this.customerFirstName,
      //   last_name: this.customerLastName,
      //   email: this.customerEmail,
      //   mobile_num: this.customerMobileNum
      // });
  }

  capitalizeWord = (word: string) => {
    let words: string[] = word.split(' ');
    let capitalized = " ";
    words.forEach((token: string) => {
      capitalized += token.charAt(0).toUpperCase() + token.slice(1) + " ";
    })

    console.log(capitalized.trim());
    return capitalized.trim();
  }

  get f() {
    return this.checkoutForm.controls;
  }

  get addForm() {
    return this.addressForm.controls;
  }

  getTotal = () => {

    return this.customerOrder.subtotal.reduce(
      (total, subtotal) => total + subtotal, 0
    );
  }

  endTransaction = () => {
    this.router.navigate(['/home']);
  }

  onSubmit = () => {
    this.submitted = true;
    let paymentMethod = this.checkoutForm.get('paymentMethod')?.value as string;
    paymentMethod = (paymentMethod.includes('Cash'))? "COD" : paymentMethod;
    
    const userBillingAddress = this.addressForm.getRawValue();
    userBillingAddress.country = this.capitalizeWord(userBillingAddress.country);
    userBillingAddress.city = this.capitalizeWord(userBillingAddress.city);
    userBillingAddress.province = this.capitalizeWord(userBillingAddress.province);
    userBillingAddress.username = this.customerUsername;
    delete userBillingAddress.agree; 
    console.log(userBillingAddress);

    if(this.checkoutForm.invalid ||
      paymentMethod.includes('Select') || 
      this.addressForm.invalid
    ) {
      this.messageService.add({ severity:'error', summary: 'Error', detail: 'Please fill up all forms before check out' });
      return;
    }

    console.log("username: ", this.customerUsername);
    this.addService.checkIfUserAddressExists(this.customerUsername).subscribe(
      exists => {
        if(!exists) {
          this.addService.addUserAddress(userBillingAddress as Address).subscribe(
            response => {
              console.log("Address added: ", response);
            },
            error => {
              console.log("Failed adding address: ", error);
            }
          )
        } else {
          this.addService.getAddressByUsername(this.customerUsername).subscribe(
            address => {
              userBillingAddress.id = address[0].id;
              console.log(userBillingAddress.id);
              this.addService.updateUserAddress(userBillingAddress as Address).subscribe(
                response => {
                  console.log("Address updated: ", response);
    
                },
                error => {
                  console.log("Failed to update address: ", error);
                }
              )
            }
          );
          
        }
      }
    );

    this.orderService.getTempOrder(this.customerUsername).subscribe(
      order => {
        this.customerOrder = order[0];
      }
    );

    this.orderService.checkIfOrderExistsById(this.customerOrder.id).subscribe(
      exists => {
        if(!exists) {

          this.orderService.getTempOrder(this.customerUsername).subscribe(
            tempOrders => {
              if(tempOrders.length > 0){
                this.customerOrder = tempOrders[0];
                this.customerOrder.id = tempOrders[0].id;
                this.customerOrder.location = userBillingAddress.city;
                this.customerOrder.payment_mode = paymentMethod;
                this.customerOrder.datetime = Date.now();
                this.customerOrder.customer_img = tempOrders[0].customer_img;
                
                this.orderService.createOrder(this.customerOrder).subscribe(
                  response => {
                    console.log("Created order: ", response);
                    // show receipt modal
                    this.orderService.deleteTempOrder(this.customerOrder.id).subscribe(
                      deletedTempOrder => {
                        console.log("Deleted temp order: ", deletedTempOrder);
        
                        // this.router.navigate(['/home']);
                      },
                      deleteError => {
                        console.log("Failed to delete temp order: ", deleteError);
                      }
                    );
      
                    this.cartService.getCartItems(this.customerUsername).subscribe(
                      items => {
                        if(items.length > 0) {
                          this.cartService.removeCartItems(items[0].id).subscribe(
                            deletedCart => {
                              
                              console.log("Deleted cart: ", deletedCart);
                              this.openReceiptModal.nativeElement.click();
                            },
                            deleteError => {
                              console.log("Failed deleting cart: ", deleteError);
                            }
                          );
                        }
                      }
                    );
                  },
                  error => {
                    console.log("Failed to create order: ", error);
                  }
                )
              }
            }
          )
        } else {
          this.orderService.getOrdersById(this.customerOrder.id).subscribe(
            orders => {
              this.customerOrder = orders[0];
              this.customerOrder.id = orders[0].id;
              this.customerOrder.location = userBillingAddress.city;
              this.customerOrder.payment_mode = paymentMethod;
              // this.customerOrder.datetime = Date.now();
              this.customerOrder.customer_img = orders[0].customer_img;

              this.orderService.updateOrder(this.customerOrder as Order).subscribe(
                response => {
                  console.log("Updated order: ", response);
                  this.openReceiptModal.nativeElement.click();
                },
                error => {
                  console.log("Failed to update order: ", error);
                }
              )
              
            }
          )
        }
      }
    )
    

    if(!paymentMethod.includes("Select")){
      this.submitted = false;
    }
  }
}
