import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from 'src/app/pages/offer/offer.component';
import { UserLayoutComponent } from './user-layout.component';
import { OfferFormComponent } from 'src/app/pages/offer-form/offer-form.component';
import { OfferMobileComponent } from 'src/app/pages/offer-mobile/offer-mobile.component';
import { UserFormComponent } from 'src/app/pages/user-form/user-form.component';
import { ProfilComponent } from 'src/app/pages/profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent, 
    children: [
      { path: '', redirectTo: 'offer', pathMatch: 'full' },
      { path: 'offer', component: OfferComponent },
      { path: 'offer-form', component: OfferFormComponent },
      { path: 'offer-mobile', component: OfferMobileComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'profil', component: ProfilComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
