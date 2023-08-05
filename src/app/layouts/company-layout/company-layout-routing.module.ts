import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from './company-layout.component';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';
import { CompanyFormComponent } from 'src/app/pages/company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent, 
    children: [
      { path: '', redirectTo: 'recruit', pathMatch: 'full' },
      { path: 'recruit', component: RecruitComponent },
      { path: 'company-form', component: CompanyFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyLayoutRoutingModule { }
