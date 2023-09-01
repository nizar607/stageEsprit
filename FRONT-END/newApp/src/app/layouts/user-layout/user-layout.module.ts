import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
// pages
import { UserLayoutComponent } from './user-layout.component';
import { OfferComponent } from 'src/app/pages/offer/offer.component';
import { OfferFormComponent } from 'src/app/pages/offer-form/offer-form.component';
import { OfferMobileComponent } from 'src/app/pages/offer-mobile/offer-mobile.component';
import { UserFormComponent } from 'src/app/pages/user-form/user-form.component';
import { ProfilComponent } from 'src/app/pages/profil/profil.component';
import { UserNavComponent } from 'src/app/pages/user-nav/user-nav.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    OfferComponent,
    OfferFormComponent,
    OfferMobileComponent,
    UserFormComponent,
    ProfilComponent,
    UserNavComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [UserLayoutComponent]
})
export class UserLayoutModule { }
