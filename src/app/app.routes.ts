import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'errors', loadChildren:()=>import('./pages/errors-module/errors.routing').then(c=>c.ErrorsRoutes),},
  { path: 'auth', loadChildren:()=>import('./pages/auth-module/auth.routing').then(c=>c.AuthRoutes),},
  { path: 'ui', loadChildren:()=>import('./pages/dashboard-module/DashboardModule').then(c=>c.DashboardModule),},
//  { path: '', redirectTo:'auth/login', pathMatch:'full'},

  { path: '**', redirectTo: 'errors/404',pathMatch:'full' },



];
