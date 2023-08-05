import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { UserLayoutModule } from './layouts/user-layout/user-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyLayoutModule } from './layouts/company-layout/company-layout.module';
import { ProfilComponent } from './pages/profil/profil.component';

//import { FormsModule } from '@angular/forms';
//import { AngularEditorModule } from '@kolkov/angular-editor';
//import { HttpClientModule} from '@angular/common/http';


// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { MatListModule } from '@angular/material/list';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatCardModule } from '@angular/material/card';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthLayoutModule,
    UserLayoutModule,
    CompanyLayoutModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
