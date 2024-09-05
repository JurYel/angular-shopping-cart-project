import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from '../../shared/shared.module';
import { AccountsComponent } from './pages/accounts/accounts.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsComponent,
    AccountsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
