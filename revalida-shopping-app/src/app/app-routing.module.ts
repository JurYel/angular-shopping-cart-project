import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [adminGuard]
    // add guards for admin - accessible for admin only
  },
  {
    path: 'error',
    loadChildren: () => import("./modules/errors/errors.module").then((m) => m.ErrorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
