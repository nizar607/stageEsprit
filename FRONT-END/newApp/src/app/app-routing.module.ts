import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './_helpers';
import { RouterModule, Routes } from '@angular/router';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);


const routes: Routes = [
  //{ path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'company', loadChildren: () => import('../app/layouts/company-layout/company-layout.module').then(c => c.CompanyLayoutModule) ,canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('../app/layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule) , canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  // RouterModule.forRoot(routes,{
  //   useHash: true
  // })
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
