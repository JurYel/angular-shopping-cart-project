import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AdminTopnavComponent } from './components/admin-topnav/admin-topnav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    AdminSidenavComponent,
    AdminTopnavComponent,
    FooterComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent, 
    AdminSidenavComponent, 
    AdminTopnavComponent,
    FooterComponent,
    AdminFooterComponent
  ]
})
export class SharedModule { }
