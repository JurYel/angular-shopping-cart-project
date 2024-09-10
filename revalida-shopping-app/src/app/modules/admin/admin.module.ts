import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from '../../shared/shared.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './pages/orders/orders.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsComponent,
    AccountsComponent,
    ProductItemComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
