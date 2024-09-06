import { NgModule } from '@angular/core';
import { E404Component } from './pages/404/404.component'
import { CommonModule } from '@angular/common';
import { E401Component } from './pages/401/401.component';
import { ErrorRoutingModule } from './error-routing.module';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [
    E401Component, E404Component
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule
]
})
export class ErrorsModule { }
