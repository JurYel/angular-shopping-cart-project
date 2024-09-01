import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PendingordersComponent } from './pendingorders/pendingorders.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    PendingordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'cart-page', component: CartComponent},
      { path: 'checkout-page', component: CheckoutComponent},
      { path: 'pending-orders', component: PendingordersComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
