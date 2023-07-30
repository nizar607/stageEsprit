import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('../app/layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule) },
  { path: 'auth', loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) },
];

@NgModule({
  // RouterModule.forRoot(routes,{
  //   useHash: true
  // })
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
