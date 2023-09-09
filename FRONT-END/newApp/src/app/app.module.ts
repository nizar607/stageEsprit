import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { UserLayoutModule } from './layouts/user-layout/user-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyLayoutModule } from './layouts/company-layout/company-layout.module';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';
import { HomeComponent } from './pages/home/home.component';


import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthLayoutModule,
    UserLayoutModule,
    CompanyLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule
    // MatToolbarModule,
    // MatButtonModule,
    // MatDividerModule,
    // MatSelectModule,
    // MatFormFieldModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatInputModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatListModule,
    // MatExpansionModule,
    // MatCardModule,
    // MatMenuModule,
    // MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
