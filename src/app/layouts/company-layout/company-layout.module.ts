import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyLayoutRoutingModule } from './company-layout-routing.module';
import { CompanyLayoutComponent } from './company-layout.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';

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
    HttpClientModule
    
  ]
})
export class CompanyLayoutModule { }
