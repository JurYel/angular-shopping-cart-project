import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AdminTopnavComponent } from './components/admin-topnav/admin-topnav.component';



@NgModule({
  declarations: [
    NavbarComponent,
    AdminSidenavComponent,
    AdminTopnavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent, AdminSidenavComponent, AdminTopnavComponent]
})
export class SharedModule { }
