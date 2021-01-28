import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.auth) },
  { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.dashboard), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
