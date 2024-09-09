import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../admin/services/products.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../admin/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products$: Observable<Product[]>;
  addToCartForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private productService: ProductsService,
              private orderService: OrderService
  ) {
    this.products$ = this.productService.getProducts();
    this.addToCartForm = this.fb.group({
      "quantity": [1, [Validators.required, Validators.min(1)]]
    });
  }

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }

  addToCart = (index: number) => {
    const quantityInput = this.addToCartForm.getRawValue();
    if(parseInt(this.addToCartForm.get('quantity')?.value) > 0) {
      this.products$.pipe(
        map(products => products[index])
      ).subscribe(
        response => {

        }
      );
    }
  }
}
