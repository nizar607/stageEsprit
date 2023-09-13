import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { CompanyProfileFormComponent } from './pages/company-profile-form/company-profile-form.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', redirectTo: 'auth/user-form', pathMatch: 'full' },
  { path: 'company', loadChildren: () => import('../app/layouts/company-layout/company-layout.module').then(c => c.CompanyLayoutModule) },
  { path: 'user', loadChildren: () => import('../app/layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule) },
  { path: 'auth', loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
  { path: 'home',component: HomePageComponent},
  {
    path: 'company-profile-form',
    component: CompanyProfileFormComponent
  }
  
  
  

];

@NgModule({
  // RouterModule.forRoot(routes,{
  //   useHash: true
  // })
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
