import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyLayoutRoutingModule } from './company-layout-routing.module';
import { CompanyLayoutComponent } from './company-layout.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';
import { RouterModule } from '@angular/router';
import { RecuirtFormComponent } from '../../pages/recuirt-form/recuirt-form.component';


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
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CompanyNavComponent } from 'src/app/pages/company-nav/company-nav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewsComponent } from 'src/app/pages/reviews/reviews.component';
import { JobsComponent } from '../../pages/jobs/jobs.component';
import { CandidatesComponent } from  '../../pages/candidates/candidates.component';
import { AboutComponent } from '../../pages/about/about.component';
import { LineComponent } from 'src/app/pages/line/line.component';
import { BarComponent } from '../../pages/bar/bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CompanyLayoutComponent,
    RecruitComponent,
    DashboardComponent,
    CompanyNavComponent,
    ReviewsComponent,
    JobsComponent,
    CandidatesComponent,
    AboutComponent,
    LineComponent,
    BarComponent,
    RecuirtFormComponent
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
    MatButtonToggleModule,
    MatStepperModule,
    MatTabsModule,
    RouterModule,
    NgChartsModule,
    MatDialogModule
  ]
})
export class CompanyLayoutModule { }
