import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyLayoutRoutingModule } from './company-layout-routing.module';
import { CompanyLayoutComponent } from './company-layout.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';

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
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    CompanyLayoutComponent,
    RecruitComponent
  ],
  imports: [
    CommonModule,
    CompanyLayoutRoutingModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
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
    MatStepperModule,
    MatButtonToggleModule
  ]
})
export class CompanyLayoutModule { }
