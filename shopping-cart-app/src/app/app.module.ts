import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ShoppingCartComponent } from './dashboard/shoppingcart/shoppingcart.component';
import { ProductitemsComponent } from './dashboard/productitems/productitems.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { PasswordMatchDirective } from './shared/directives/password-match.directive';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductitemsComponent,
    CheckoutComponent,

    PasswordMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: ShoppingCartComponent},
      { path: 'checkout', component: CheckoutComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full'}
    ]),

    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ToastModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageService], //MessageService
  bootstrap: [AppComponent]
})
export class AppModule { }
