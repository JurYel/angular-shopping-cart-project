import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { E401Component } from './pages/401/401.component';
import { E404Component } from './pages/404/404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '401',
    pathMatch: 'full'
  },
  {
    path: '401',
    component: E401Component
  },
  {
    path: '404',
    component: E404Component
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
export class ErrorRoutingModule { }
