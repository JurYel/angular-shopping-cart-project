import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyPurchasesComponent } from './pages/my-purchases/my-purchases.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'purchases',
    component: MyPurchasesComponent,
    canActivate: [authGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
