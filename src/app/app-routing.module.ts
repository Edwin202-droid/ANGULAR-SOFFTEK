import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterModule),
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(x => x.DashboardModule),
    canActivate: [LoginGuard] 
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
