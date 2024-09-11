import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OrderService } from '../../../admin/services/order.service';
import { Order } from '../../../models/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  customerOrder: Order;
  submitted: boolean = false;
  customerUsername: string;
  checkoutForm: FormGroup;
  addressForm: FormGroup;
  paymentMethods: string[] = [];
  paymentMethod: string;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private orderService: OrderService,
              private router: Router
  ) {
    this.customerUsername = sessionStorage.getItem('username') as string; 

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
      mobile_num: ['', [Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zip_code: ['', Validators.required],
      agree: [false, Validators.required]
    });


    this.paymentMethod = 'Select payment method';
    this.paymentMethods = [
      "Cash on Delivery",
      "Pickup",
      "Gcash",
      "PayMaya",
      "Credit Card"
    ]

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

  onSubmit = () => {
    this.submitted = true;
    let paymentMethod = this.checkoutForm.get('paymentMethod')?.value as string;
    paymentMethod = (paymentMethod.includes('Cash'))? "COD" : paymentMethod;
    console.log(paymentMethod);

    if(this.checkoutForm.invalid ||
      paymentMethod.includes('Select')
    ) {
      return;
    }



    if(!paymentMethod.includes("Select")){
      this.submitted = false;
    }
  }
}
