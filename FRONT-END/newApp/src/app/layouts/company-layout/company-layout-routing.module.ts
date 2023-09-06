import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLayoutComponent } from './company-layout.component';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ReviewsComponent } from 'src/app/pages/reviews/reviews.component';
import { JobsComponent } from 'src/app/pages/jobs/jobs.component';
import { CandidatesComponent } from 'src/app/pages/candidates/candidates.component';
import { AboutComponent } from 'src/app/pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyLayoutComponent,
    children: [
      { path: '', redirectTo: 'recruit', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: 'recruit', component: RecruitComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'candidates', component: CandidatesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyLayoutRoutingModule { }
